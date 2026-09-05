import React from "react";
import "../App.css";

function StudyingForest() {
  return (
    <div>
      <main className="studying-forest-page">
        <div className="studying-forest-container">

          <div className="phenology-image-wrapper">
            <img
              src="/phenology-red-maple.jpg"
              alt="Red maple in the Miyawaki Forest"
              className="phenology-image"
            />

            <div className="phenology-image-caption">
              Red Maple
            </div>
          </div>

          <div className="phenology-content">

            <h1 className="phenology-title">
              Phenology Project
            </h1>

            <p className="phenology-intro">
              Join us to collect data on seasonal phenomena such as bud break,
              leaf growth, flowering, fruiting, and leaf drop to help the
              National Phenology Network study trends in climate change.
            </p>

            <div className="phenology-training">
              <p>Volunteers will be trained to collect data:</p>

              <ul>
                <li>In the form of yes/no &amp; multiple choice questions</li>
                <li>On 9-10 trees during the growing season</li>
              </ul>
            </div>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScEmt1Bg0T-mhlZ_dE6TRlVrZ7EQ34nygG8D-ELzAwk5Alkzw/viewform?usp=sharing&ouid=110659987342295856505"
              target="_blank"
              rel="noopener noreferrer"
              className="phenology-signup-button"
            >
              Sign up form
            </a>

          </div>
        </div>
      </main>
    </div>
  );
}

export default StudyingForest;