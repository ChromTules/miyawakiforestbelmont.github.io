import React from "react";
import "../App.css";

function StudyingForest() {
  return (
    <div>
      <section className="hero studying-forest-hero">
        <div className="container">
          <h1>Phenology Project</h1>

          <p className="subtitle">
            Help us document how the forest changes through the seasons.
          </p>
        </div>
      </section>

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
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudyingForest;