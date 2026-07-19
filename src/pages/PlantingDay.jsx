function PlantingDay() {
  return (
    <div className="planting-day">
      
      {/*}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Planting Day</h1>
            <p className="subtitle" style={{ paddingTop: "40px" }}>
              Community planting event details and updates.
            </p>
          </div>
        </div>
      </section>
      */}
      <section className="section-alt">
        <div className="container">
          <div className="planting-day-hero">
            <img src="/assets/planting.jpg" alt="Planting Day" />
            <h2 className="planting-day-title">Planting Day</h2>
            <p className="planting-day-caption">Photo by Nick Geron</p>
          </div>
          <h2>Latest Updates & Upcoming Events</h2>
          <div className="timeline-compact">
            <div className="timeline-item-compact completed">
              <div className="timeline-date">July 2025</div>
              <div className="timeline-content-compact">
                <h4>Project Website Launch</h4>
                <p>
                  Our official website is now live! Share it to help spread
                  awareness.
                </p>
              </div>
            </div>
            <div className="timeline-item-compact completed">
              <div className="timeline-date">June 2025</div>
              <div className="timeline-content-compact">
                <h4>Site Selection Completed</h4>
                <p>
                  Perfect 3,000 sq ft location selected with optimal
                  conditions.
                </p>
              </div>
            </div>
            <div className="timeline-item-compact upcoming">
              <div className="timeline-date">August 2025</div>
              <div className="timeline-content-compact">
                <h4>Volunteer Training Program</h4>
                <p>
                  Training sessions for volunteers on planting techniques.
                </p>
              </div>
            </div>
            <div className="timeline-item-compact upcoming">
              <div className="timeline-date">October 2025</div>
              <div className="timeline-content-compact">
                <h4>Community Planting Day</h4>
                <p>
                  Our planting date is Saturday, October 4th 2025 from 10 AM to
                  6 PM at the Triangle in front of Belmont High School by Clay
                  Pit Pond, 221 Concord Ave.
                  <br></br>
                  <br></br>Our rain date is October 5th
                  <br></br>
                  <br></br>
                  We are seeking volunteers to help bring Belmont's first
                  mini-forest to life by planting hundreds of native plants. If
                  you’d like to be part of this transformative project, please
                  fill out this sign-up form to express your interest in
                  volunteering. All ages able to participate in planting are
                  encouraged to join!
                  <br></br>
                  <br></br>
                  The forest will need stewards and volunteers to plant
                  seedlings, spread mulch, and organize materials.
                  <br></br>
                  <br></br>
                  After the planting, for the next three growing seasons,
                  volunteers will maintain and monitor the forest. This
                  including weeding, litter removal and data collection. More
                  information on how to get involved with post-planting will be
                  released later!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlantingDay;