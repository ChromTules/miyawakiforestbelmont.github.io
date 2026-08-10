function ProgramsPoetry() {
  return (
    <div>
      {/* Keep the green hero banner */}
      <section className="hero">
        <div className="container">
          <h1>2026 Mini-Poetry Contest</h1>

          <p className="subtitle" style={{ paddingTop: "40px" }}>
            Contest details and submission information
          </p>
        </div>
      </section>

      {/* Contest information */}
      <section>
        <div className="container">
          <div className="card">
            <p>
              We invite Belmont students to participate in the forest’s first
              Poetry Competition!
              <br />
              Potential subjects to observe and write about:
            </p>

            <div
              style={{
                textAlign: "center",
                lineHeight: "1.7",
                margin: "2rem 0",
              }}
            >
              Budding plants
              <br />
              Your favorite tree or shrub
              <br />
              How the plants in the forest change at different times of day
              <br />
              The wind or weather’s effect on the forest
              <br />
              How the plants in the canopy, sub-canopy, and edge interact with
              each other
              <br />
              How the plants are in conversation with each other
              <br />
              Insects, birds, or animals visiting the forest
              <br />
              Markings on the branches, leaves, or stems of plants
              <br />
              Your questions about this forest community
              <br />
              And anything else that might pop up in the forest!
            </div>

            <p>
              <strong>Submission Deadline:</strong> End of day Friday September
              4, 2026
              <br />
              <strong>Categories:</strong> Separate winners for grades K-3, 4-6,
              7-8, and 9-13 &amp; up to three honorable mentions for each group
            </p>

            {/* Submit button */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "2.25rem 0",
              }}
            >
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeFBv0lQYjxVebCbBkjFc5aEe0z_seKovkqDng6RLHWg2sogg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  padding: "0.9rem 2.25rem",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                Submit Your Poem
              </a>
            </div>

            <p
              style={{
                textAlign: "center",
                marginTop: "2rem",
              }}
            >
              Winners will be posted on laminated cards affixed to the fence
              surrounding the forest for human visitors (and wildlife) to read!
              <br />
              Results will be announced October 3
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProgramsPoetry;