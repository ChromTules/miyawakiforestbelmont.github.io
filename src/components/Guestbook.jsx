import { useState, useEffect } from "react";
import { MessageCircle, User, Send, Reply, Edit2, Trash2, Check, X } from "lucide-react";

// Avatar colors for profile pictures
const avatarColors = [
  "#28502e", // forest-green
  "#47682c", // sage-green
  "#6b8e23", // olive
  "#556b2f", // dark olive
  "#8fbc8f", // dark sea green
  "#90ee90", // light green
  "#3cb371", // medium sea green
  "#2e8b57", // sea green
];

// Generate a consistent color based on name
const getAvatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

// API endpoint - using Netlify Functions + GitHub
const API_ENDPOINT = "/.netlify/functions/guestbook";

function Guestbook() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    relations: [],
    message: "",
  });
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState({
    name: "",
    relations: [],
    message: "",
  });
  const [showRelationsDropdown, setShowRelationsDropdown] = useState(false);
  const [showReplyRelationsDropdown, setShowReplyRelationsDropdown] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState({
    name: "",
    relations: [],
    message: "",
  });
  const [showEditRelationsDropdown, setShowEditRelationsDropdown] = useState(false);

  const relationOptions = [
    "Belmont resident",
    "BHMS student",
    "Planting day volunteer",
  ];

  // Load comments from backend
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINT, {
        method: "GET",
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      
      const data = await response.json();
      setComments(data.comments || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Unable to load comments. Please try again later.");
      // Fallback to localStorage
      const savedComments = localStorage.getItem("guestbookComments");
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveComment = async (commentData, replyToId = null) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          comment: commentData,
          replyToId: replyToId 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save comment");
      }

      const result = await response.json();
      setError(null);
      return result.comment;
    } catch (err) {
      console.error("Error saving comment:", err);
      setError("Unable to save comment. Please try again.");
      throw err;
    }
  };

  const handleRelationToggle = (relation, isReply = false) => {
    if (isReply) {
      setReplyText((prev) => ({
        ...prev,
        relations: prev.relations.includes(relation)
          ? prev.relations.filter((r) => r !== relation)
          : [...prev.relations, relation],
      }));
    } else {
      setNewComment((prev) => ({
        ...prev,
        relations: prev.relations.includes(relation)
          ? prev.relations.filter((r) => r !== relation)
          : [...prev.relations, relation],
      }));
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.message.trim()) {
      alert("Please fill in your name and message!");
      return;
    }

    const commentData = {
      name: newComment.name.trim(),
      relations: newComment.relations,
      message: newComment.message.trim(),
      replies: [],
    };

    try {
      // Optimistic UI update
      const tempComment = { ...commentData, id: "temp-" + Date.now() };
      setComments([tempComment, ...comments]);
      
      // Save to backend
      const savedComment = await saveComment(commentData);
      
      // Replace temp comment with saved one
      setComments(prevComments => 
        prevComments.map(c => c.id === tempComment.id ? savedComment : c)
      );
      
      // Also save to localStorage as backup
      localStorage.setItem("guestbookComments", JSON.stringify([savedComment, ...comments]));
      
      setNewComment({ name: "", relations: [], message: "" });
      setShowRelationsDropdown(false);
    } catch (err) {
      // Revert optimistic update on error
      setComments(comments);
      alert("Failed to post comment. Please try again.");
    }
  };

  const handleSubmitReply = async (commentId) => {
    if (!replyText.name.trim() || !replyText.message.trim()) {
      alert("Please fill in your name and message!");
      return;
    }

    const replyData = {
      name: replyText.name.trim(),
      relations: replyText.relations,
      message: replyText.message.trim(),
    };

    try {
      // Save reply to backend
      const savedReply = await saveComment(replyData, commentId);
      
      // Update local state
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId
            ? { ...comment, replies: [...(comment.replies || []), savedReply] }
            : comment
        )
      );
      
      // Also save to localStorage as backup
      const updatedComments = comments.map(comment =>
        comment.id === commentId
          ? { ...comment, replies: [...(comment.replies || []), savedReply] }
          : comment
      );
      localStorage.setItem("guestbookComments", JSON.stringify(updatedComments));
      
      setReplyText({ name: "", relations: [], message: "" });
      setReplyingTo(null);
      setShowReplyRelationsDropdown(false);
    } catch (err) {
      alert("Failed to post reply. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}?id=${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      // Update local state
      setComments(prevComments => prevComments.filter(c => c.id !== commentId));
      
      // Update localStorage
      const updatedComments = comments.filter(c => c.id !== commentId);
      localStorage.setItem("guestbookComments", JSON.stringify(updatedComments));
      
      setError(null);
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditText({
      name: comment.name,
      relations: comment.relations,
      message: comment.message,
    });
  };

  const handleSaveEdit = async (commentId) => {
    if (!editText.name.trim() || !editText.message.trim()) {
      alert("Please fill in your name and message!");
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}?id=${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editText.name.trim(),
          relations: editText.relations,
          message: editText.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      const result = await response.json();
      
      // Update local state
      setComments(prevComments =>
        prevComments.map(c => c.id === commentId ? result.comment : c)
      );
      
      // Update localStorage
      const updatedComments = comments.map(c => 
        c.id === commentId ? result.comment : c
      );
      localStorage.setItem("guestbookComments", JSON.stringify(updatedComments));
      
      setEditingComment(null);
      setEditText({ name: "", relations: [], message: "" });
      setShowEditRelationsDropdown(false);
      setError(null);
    } catch (err) {
      console.error("Error updating comment:", err);
      alert("Failed to update comment. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditText({ name: "", relations: [], message: "" });
    setShowEditRelationsDropdown(false);
  };

  const Avatar = ({ name }) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const bgColor = getAvatarColor(name);

    return (
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.2rem",
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
    );
  };

  return (
    <section className="section-alt">
      <div className="container">
        <div
          className="guestbook-container"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            
            <MessageCircle size={28} color="var(--forest-green)" />
            <h2 style={{ margin: 0 }}>Guestbook</h2>

          </div>

          {error && (
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#fff3cd",
                color: "#856404",
                borderRadius: "6px",
                marginBottom: "1rem",
              }}
            >
              {error}
            </div>
          )}

          {isLoading ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "var(--text-light)",
              }}
            >
              <p>Loading comments...</p>
            </div>
          ) : (
            <>
              {/* Leave a Comment Box */}
              <div
            className="leave-comment-box"
            style={{
              backgroundColor: "var(--cream)",
              padding: "1.5rem",
              borderRadius: "8px",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Leave a Comment</h3>
            <form onSubmit={handleSubmitComment}>
              <div style={{ marginBottom: "1rem" }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newComment.name}
                  onChange={(e) =>
                    setNewComment({ ...newComment, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                    color: "#666",
                    fontWeight: "normal",
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: "1rem", position: "relative" }}>
                <button
                  type="button"
                  onClick={() => setShowRelationsDropdown(!showRelationsDropdown)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    backgroundColor: "white",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "#666",
                    fontWeight: "normal",
                  }}
                >
                  {newComment.relations.length > 0
                    ? newComment.relations.join(", ")
                    : "Select your relation to the forest (optional)"}
                </button>

                {showRelationsDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      backgroundColor: "white",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      marginTop: "0.25rem",
                      zIndex: 10,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    {relationOptions.map((relation) => (
                      <label
                        key={relation}
                        style={{
                          display: "block",
                          padding: "0.75rem",
                          cursor: "pointer",
                          borderBottom: "1px solid #f0f0f0",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={newComment.relations.includes(relation)}
                          onChange={() => handleRelationToggle(relation)}
                          style={{ marginRight: "0.5rem" }}
                        />
                        {relation}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <textarea
                  placeholder="Share your thoughts about the Miyawaki Forest..."
                  value={newComment.message}
                  onChange={(e) =>
                    setNewComment({ ...newComment, message: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                    minHeight: "100px",
                    resize: "vertical",
                    color: "#666",
                    fontWeight: "normal",
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Send size={18} />
                Post
              </button>
            </form>
          </div>

          {/* Comments List */}
          <div className="comments-list">
            <h3 style={{ marginBottom: "1.5rem" }}>
              {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
            </h3>

            {comments.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "var(--text-light)",
                  padding: "2rem",
                }}
              >
                Be the first to leave a comment!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    marginBottom: "2rem",
                    paddingBottom: "2rem",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  {/* Main Comment */}
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Avatar name={comment.name} />
                    <div style={{ flex: 1 }}>
                      {editingComment === comment.id ? (
                        // Edit Mode
                        <div
                          style={{
                            padding: "1rem",
                            backgroundColor: "#f9f9f9",
                            borderRadius: "6px",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={editText.name}
                            onChange={(e) =>
                              setEditText({ ...editText, name: e.target.value })
                            }
                            style={{
                              width: "100%",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                              borderRadius: "4px",
                              border: "1px solid #ddd",
                              color: "#666",
                              fontWeight: "normal",
                            }}
                          />

                          <div
                            style={{
                              marginBottom: "0.5rem",
                              position: "relative",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setShowEditRelationsDropdown(
                                  !showEditRelationsDropdown
                                )
                              }
                              style={{
                                width: "100%",
                                padding: "0.5rem",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                                backgroundColor: "white",
                                textAlign: "left",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                color: "#666",
                                fontWeight: "normal",
                              }}
                            >
                              {editText.relations.length > 0
                                ? editText.relations.join(", ")
                                : "Select your relation (optional)"}
                            </button>

                            {showEditRelationsDropdown && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: 0,
                                  right: 0,
                                  backgroundColor: "white",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  marginTop: "0.25rem",
                                  zIndex: 10,
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                }}
                              >
                                {relationOptions.map((relation) => (
                                  <label
                                    key={relation}
                                    style={{
                                      display: "block",
                                      padding: "0.5rem",
                                      cursor: "pointer",
                                      borderBottom: "1px solid #f0f0f0",
                                      color: "#666",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={editText.relations.includes(
                                        relation
                                      )}
                                      onChange={() => {
                                        setEditText((prev) => ({
                                          ...prev,
                                          relations: prev.relations.includes(relation)
                                            ? prev.relations.filter((r) => r !== relation)
                                            : [...prev.relations, relation],
                                        }));
                                      }}
                                      style={{ marginRight: "0.5rem" }}
                                    />
                                    {relation}
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>

                          <textarea
                            placeholder="Your message..."
                            value={editText.message}
                            onChange={(e) =>
                              setEditText({
                                ...editText,
                                message: e.target.value,
                              })
                            }
                            style={{
                              width: "100%",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                              borderRadius: "4px",
                              border: "1px solid #ddd",
                              minHeight: "80px",
                              resize: "vertical",
                              color: "#666",
                              fontWeight: "normal",
                            }}
                          />

                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button
                              onClick={() => handleSaveEdit(comment.id)}
                              className="btn btn-primary"
                              style={{ 
                                padding: "0.5rem 1rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem"
                              }}
                            >
                              <Check size={16} />
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#ccc",
                                border: "none",
                                borderRadius: "25px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem"
                              }}
                            >
                              <X size={16} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <strong style={{ fontSize: "1.1rem" }}>
                                {comment.name}
                              </strong>
                              {comment.relations.length > 0 && (
                                <span
                                  style={{
                                    fontSize: "0.85rem",
                                    color: "var(--text-light)",
                                  }}
                                >
                                  • {comment.relations.join(", ")}
                                </span>
                              )}
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button
                                onClick={() => handleEditComment(comment)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#666",
                                  cursor: "pointer",
                                  padding: "0.25rem",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                title="Edit comment"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#d32f2f",
                                  cursor: "pointer",
                                  padding: "0.25rem",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                title="Delete comment"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <p style={{ margin: "0.5rem 0 1rem 0" }}>
                            {comment.message}
                          </p>
                          <button
                            onClick={() =>
                              setReplyingTo(
                                replyingTo === comment.id ? null : comment.id
                              )
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                              background: "none",
                              border: "none",
                              color: "var(--forest-green)",
                              cursor: "pointer",
                              fontSize: "0.9rem",
                              padding: "0.25rem 0",
                            }}
                          >
                            <Reply size={16} />
                            Reply
                          </button>
                        </>
                      )}

                      {/* Reply Form */}
                      {replyingTo === comment.id && (
                        <div
                          style={{
                            marginTop: "1rem",
                            padding: "1rem",
                            backgroundColor: "#f9f9f9",
                            borderRadius: "6px",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={replyText.name}
                            onChange={(e) =>
                              setReplyText({ ...replyText, name: e.target.value })
                            }
                            style={{
                              width: "100%",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                              borderRadius: "4px",
                              border: "1px solid #ddd",
                              color: "#666",
                              fontWeight: "normal",
                            }}
                          />

                          <div
                            style={{
                              marginBottom: "0.5rem",
                              position: "relative",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setShowReplyRelationsDropdown(
                                  !showReplyRelationsDropdown
                                )
                              }
                              style={{
                                width: "100%",
                                padding: "0.5rem",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                                backgroundColor: "white",
                                textAlign: "left",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                color: "#666",
                                fontWeight: "normal",
                              }}
                            >
                              {replyText.relations.length > 0
                                ? replyText.relations.join(", ")
                                : "Select your relation (optional)"}
                            </button>

                            {showReplyRelationsDropdown && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: 0,
                                  right: 0,
                                  backgroundColor: "white",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  marginTop: "0.25rem",
                                  zIndex: 10,
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                }}
                              >
                                {relationOptions.map((relation) => (
                                  <label
                                    key={relation}
                                    style={{
                                      display: "block",
                                      padding: "0.5rem",
                                      cursor: "pointer",
                                      borderBottom: "1px solid #f0f0f0",
                                      color: "#666",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={replyText.relations.includes(
                                        relation
                                      )}
                                      onChange={() =>
                                        handleRelationToggle(relation, true)
                                      }
                                      style={{ marginRight: "0.5rem" }}
                                    />
                                    {relation}
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>

                          <textarea
                            placeholder="Write a reply..."
                            value={replyText.message}
                            onChange={(e) =>
                              setReplyText({
                                ...replyText,
                                message: e.target.value,
                              })
                            }
                            style={{
                              width: "100%",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                              borderRadius: "4px",
                              border: "1px solid #ddd",
                              minHeight: "60px",
                              resize: "vertical",
                              color: "#666",
                              fontWeight: "normal",
                            }}
                          />

                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button
                              onClick={() => handleSubmitReply(comment.id)}
                              className="btn btn-primary"
                              style={{ padding: "0.5rem 1rem" }}
                            >
                              Submit Reply
                            </button>
                            <button
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText({
                                  name: "",
                                  relations: [],
                                  message: "",
                                });
                                setShowReplyRelationsDropdown(false);
                              }}
                              style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#ccc",
                                border: "none",
                                borderRadius: "25px",
                                cursor: "pointer",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div style={{ marginTop: "1rem" }}>
                          {comment.replies.map((reply) => (
                            <div
                              key={reply.id}
                              style={{
                                display: "flex",
                                gap: "1rem",
                                marginTop: "1rem",
                                paddingLeft: "1rem",
                                borderLeft: "3px solid var(--sage-green)",
                              }}
                            >
                              <Avatar name={reply.name} />
                              <div style={{ flex: 1 }}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    marginBottom: "0.5rem",
                                  }}
                                >
                                  <strong>{reply.name}</strong>
                                  {reply.relations.length > 0 && (
                                    <span
                                      style={{
                                        fontSize: "0.85rem",
                                        color: "var(--text-light)",
                                      }}
                                    >
                                      • {reply.relations.join(", ")}
                                    </span>
                                  )}
                                </div>
                                <p style={{ margin: 0 }}>{reply.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Guestbook;
