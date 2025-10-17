const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));
const crypto = require('crypto');

exports.handler = async function (event) {
  const OWNER = process.env.GITHUB_REPO_OWNER;
  const REPO = process.env.GITHUB_REPO_NAME;
  const FILE_PATH = process.env.GUESTBOOK_FILE_PATH || "src/content/guestbook.json";
  const TOKEN = process.env.GITHUB_TOKEN;
  const COMMITTER = {
    name: process.env.GUESTBOOK_COMMITTER_NAME || "Guestbook Bot",
    email: process.env.GUESTBOOK_COMMITTER_EMAIL || "guestbook@noreply.github.com",
  };

  if (!OWNER || !REPO || !TOKEN) {
    console.error("Missing required environment variables");
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: "Missing server configuration" }) 
    };
  }

  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(FILE_PATH)}`;
  const headers = {
    Authorization: `token ${TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Miyawaki-Forest-Guestbook",
  };

  try {
    // GET - Fetch all comments
    if (event.httpMethod === "GET") {
      const res = await fetch(apiUrl, { headers });
      
      // If file doesn't exist yet, return empty comments
      if (res.status === 404) {
        return { 
          statusCode: 200, 
          body: JSON.stringify({ comments: [] }),
          headers: { "Content-Type": "application/json" }
        };
      }
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("GitHub API error:", errorText);
        return { 
          statusCode: 500, 
          body: JSON.stringify({ error: "Failed to fetch comments" }) 
        };
      }
      
      const data = await res.json();
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      const guestbookData = JSON.parse(content);
      
      return { 
        statusCode: 200, 
        body: JSON.stringify(guestbookData),
        headers: { "Content-Type": "application/json" }
      };
    }

    // POST - Add a new comment or reply
    if (event.httpMethod === "POST") {
      const payload = event.body ? JSON.parse(event.body) : {};
      const incomingComment = payload.comment;
      const replyToId = payload.replyToId; // optional
      
      if (!incomingComment || !incomingComment.name || !incomingComment.message) {
        return { 
          statusCode: 400, 
          body: JSON.stringify({ error: "Invalid comment: name and message required" }) 
        };
      }

      // Fetch current file (if exists)
      const getRes = await fetch(apiUrl, { headers });
      let current = { comments: [] };
      let sha = null;
      
      if (getRes.status === 200) {
        const getData = await getRes.json();
        sha = getData.sha;
        const content = Buffer.from(getData.content, "base64").toString("utf-8");
        current = JSON.parse(content);
        if (!Array.isArray(current.comments)) current.comments = [];
      } else if (getRes.status !== 404) {
        const err = await getRes.text();
        console.error("Failed to read file:", err);
        return { 
          statusCode: 500, 
          body: JSON.stringify({ error: "Failed reading guestbook file" }) 
        };
      }

      // Generate unique ID
      const newId = crypto.randomBytes(8).toString("hex");
      incomingComment.id = newId;
      
      // If it's a reply, add to the parent comment's replies array
      if (replyToId) {
        const parentComment = current.comments.find(c => c.id === replyToId);
        if (parentComment) {
          if (!Array.isArray(parentComment.replies)) {
            parentComment.replies = [];
          }
          parentComment.replies.push(incomingComment);
        } else {
          return { 
            statusCode: 404, 
            body: JSON.stringify({ error: "Parent comment not found" }) 
          };
        }
      } else {
        // Add as new top-level comment
        incomingComment.replies = [];
        current.comments.unshift(incomingComment); // Add to beginning
      }

      // Encode and commit to GitHub
      const newContentBase64 = Buffer.from(JSON.stringify(current, null, 2)).toString("base64");
      const commitMessage = replyToId 
        ? `Add reply to comment ${replyToId}` 
        : `Add guestbook comment from ${incomingComment.name}`;
      
      const body = {
        message: commitMessage,
        content: newContentBase64,
        committer: COMMITTER,
      };
      
      if (sha) {
        body.sha = sha;
      }

      const putRes = await fetch(apiUrl, {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!putRes.ok) {
        const err = await putRes.text();
        console.error("Failed to commit to GitHub:", err);
        return { 
          statusCode: 500, 
          body: JSON.stringify({ error: "Failed saving comment to GitHub" }) 
        };
      }

      return { 
        statusCode: 200, 
        body: JSON.stringify({ 
          success: true, 
          comment: incomingComment,
          message: "Comment saved successfully" 
        }),
        headers: { "Content-Type": "application/json" }
      };
    }

    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: "Method not allowed" }) 
    };
    
  } catch (err) {
    console.error("Function error:", err);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: err.message || "Internal server error" }) 
    };
  }
};
