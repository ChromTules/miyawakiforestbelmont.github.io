import { useState, useEffect } from "react";
import { ExternalLink, Users, TreePine, Target, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import Guestbook from "../components/Guestbook";

function Home() {
  const [activeTab, setActiveTab] = useState("info");
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [supporters, setSupporters] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: '/slide0.jpg', caption: 'Photo by Nick Geron' },
    { image: '/slide1.png', caption: 'Slide 1' },
    { image: '/slide2.png', caption: 'Slide 2' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const loadSupporters = async () => {
      try {
        const supportersData = await import("../content/supporters.json");
        if (supportersData.supporters) {
          setSupporters(supportersData.supporters);
        }
      } catch (error) {
        console.log("No supporters.json found, using empty array");
        setSupporters([]);
      }
    };
    loadSupporters();
  }, []);

  const tabs = [
    { id: "info", label: "Miyawaki Forest Info", icon: <TreePine size={20} /> },
    { id: "location", label: "Where To Find It", icon: <Target size={20} /> },
    { id: "updates", label: "Planting Day", icon: <Calendar size={20} /> },
    { id: "about", label: "Supporters", icon: <Users size={20} /> },
  ];

  const handleDonateClick = () => {
    window.open(
      "https://aalslasq.donorsupport.co/page/httpsbio4climateorgm",
      "_blank"
    );
  };

  const handleVolunteerClick = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLScEmt1Bg0T-mhlZ_dE6TRlVrZ7EQ34nygG8D-ELzAwk5Alkzw/viewform",
      "_blank"
    );
  };

  const openFullscreen = (imageSrc, altText) => {
    setFullscreenImage({ src: imageSrc, alt: altText });
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero home-hero" style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
        <div className="hero-overlay">
          {/* Title Text Box */}
          <div
            style={{
              position: "absolute",
              top: "2rem",
              left: "20%",
              transform: "translateX(-50%)",
              background: "linear-gradient(to right, rgba(31, 56, 45, 0.99), rgba(95, 130, 75, 0.99))",
              padding: "1.5rem 3rem",
              borderRadius: "8px",
              maxWidth: "90%",
            }}
          >
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "700",
                textAlign: "left",
                color: "white",
                margin: 0,
                lineHeight: 1.2,
                fontFamily: "'Chakra Petch', sans-serif",
              }}
            >
              Miyawaki Forest <br />Action Belmont
            </h1>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              left: "2rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.8)",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.3s",
              zIndex: 10,
            }}
            onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 1)"}
            onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.8)"}
          >
            <ChevronLeft size={30} color="#2d5016" />
          </button>
          
          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              right: "2rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.8)",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.3s",
              zIndex: 10,
            }}
            onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 1)"}
            onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.8)"}
          >
            <ChevronRight size={30} color="#2d5016" />
          </button>
          
          <p className="hero-caption">
            {slides[currentSlide].caption}
          </p>
          <div className="cta-buttons">
            <button onClick={handleDonateClick} className="btn btn-primary">
              <ExternalLink size={20} />
              Donate To Support Our Forest
            </button>
            <button
              onClick={handleVolunteerClick}
              className="btn btn-secondary"
            >
              <ExternalLink size={20} />
              Join Us As a Volunteer
            </button>
          </div>
        </div>
      </section>
      <section className="section-alt">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "900px", margin: "0 auto" }}>
            {/* First Card - We Planted The Forest */}
            <div
              className="card"
              style={{ flex: 1, textAlign: "center" }}
            >
              <h3 style={{ marginTop: "1.5rem"}}>We Planted The Forest!</h3>
              <p style={{ fontSize: "1.6rem", color: "#496914ff", marginTop: "-2rem"}}>
                <br />
                On Saturday, October 4th 2025, MFAB and <strong>275 volunteers</strong> planted <strong>over 1,100
                saplings</strong> at Belmont High School.
              </p>

              <a href="https://youtu.be/-snRZlOdbms" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/digging.png" 
                  alt="Volunteers digging - Click to watch video" 
                  style={{ 
                    width: "100%", 
                    maxWidth: "500px", 
                    margin: "1.5rem auto 0", 
                    display: "block",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }} 
                />
              </a>
              <p style={{ fontSize: "1rem", color: "#666", marginTop: "0.5rem" }}>
                See this great two minute video our high school students made <br></br>{" "}
             
              </p>


            </div>

            {/* Second Card - We're not done yet */}
            <div
              className="card"
              style={{ flex: 1, textAlign: "center" }}
            >
              <h3 style={{ marginTop: "1.5rem" }}>
                Collect data for the Phenology Project!
              </h3>

              <div style={{ textAlign: "left", margin: "0 auto", maxWidth: "680px" }}>
                <p style={{ fontSize: "1.3rem", lineHeight: "1.6", marginTop: "0.5rem", color: "#496914" }}>
                  The Mini-forest needs you to observe and collect data on seasonal phenomena like bud break, leaf growth, flowering, fruiting, and leaf drop, starting <b>April 2026!</b>
                  <br />
                  <br />
                  This data contributes to the National Phenology Network's research in studying trends in climate change.
                </p>
                <br />

                <p style={{ fontSize: "1.1rem", lineHeight: "1.5", marginTop: "0.75rem" }}>
                  See this short <a href="https://www.youtube.com/watch?v=Eo3rVgEePfw" target="_blank" rel="noopener noreferrer">video</a> for more information.
                  <br></br>
                  <br></br>
                  <i>More information under Programs</i>
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tabbed Content Section */}
      <section className="home-tabs-section">
        <div className="container">
          <div className="tabs-container">
            <div className="tabs-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  id={tab.id}
                  className={`tab-button ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === "info" && (
                <div className="tab-panel" id="info">
                  <h2>What is a Miyawaki Forest?</h2>
                  <div className="gridz grid-2z">
                    <div>
                      <p>
                        A Miyawaki Forest is a dense planting of native trees
                        and shrubs using Dr. Miyawaki's methods to recreate old
                        growth forests. By amending the soil and planting the
                        seedlings closely together in an area the size of a
                        small swimming pool, the forest grows in a third of the
                        usual time.
                      </p>
                      <p>
                        Our 1,145 trees from 32 different native species will create an ecosystem that accelerates
                        the plants' growth and provides a biodiverse habitat for
                        native pollinators.
                      </p>
                      <a href="https://docs.google.com/document/d/1OHeL-6ni_3HXtFmkH7escEsVIfNIICZ8LTTFS8KppNY/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Our species list</a>
                      <br />
                      ️<br />
                      <p
                        style={{
                          fontStyle: "italic",
                          borderLeft: "4px solid #ccc",
                          paddingLeft: "1rem",
                          color: "#555555ff",
                        }}
                      >
                        "Real forests consisting of potential natural vegetation
                        are formed from tall trees, which are the primary trees,
                        and beneath them, semi-tall trees, short trees, and
                        bottom weeds, with the entire forest functioning as a
                        whole system. They are resistant to natural disasters,
                        and do not collapse easily... In addition to such local
                        functions, globally, they absorb carbon and can be
                        expected to curb global warming by solidifying the
                        carbon and maintaining it within the forest for
                        countless years. Naturally, live trees die after several
                        hundred years. But the semi-tall trees and short trees
                        underneath them have successor trees in waiting. When
                        one tree dies, these successor trees quickly dominate
                        the space it left behind. As a result, forest systems
                        sustain themselves semi permanently."
                        <br />
                        <br />
                        <strong style={{ color: "#555555ff" }}>
                          Dr. Akira Miyawaki
                        </strong>
                        ,{" "}
                        <a
                          href="https://af-info.or.jp/en/blueplanet/list-2006.html"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Speech for accepting the Blue Planet Prize in 2006
                        </a>
                      </p>
                    </div>
                    <br></br>
                    <div className="benefits-section">
                      <h2 style={{ marginLeft: "-1rem" }}>
                        The Mini-Forest will:
                      </h2>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          alignItems: "flex-start",
                        }}
                      >
                        <ul
                          className="benefits-list"
                          style={{ flex: "1", margin: "0" }}
                        >
                          <li>
                            <strong>Ameliorate</strong> storm water issues at
                            the high school
                          </li>
                          <li>
                            <strong>Filter</strong> air and water pollutants
                          </li>
                          <li>
                            <strong>Dampen</strong> noise
                          </li>
                          <li>
                            <strong>Cool</strong> during high temperatures
                          </li>
                          <li>
                            <strong>Provide</strong> much needed habitat for
                            pollinators and birds
                          </li>
                        </ul>
                        <figure>
                          <img
                            src="/forestbenefits.png"
                            alt="Forest benefits illustration"
                            style={{
                              width: "600px",
                              height: "auto",
                              borderRadius: "8px",
                              flexShrink: 0,
                              marginTop: "-3rem",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              openFullscreen(
                                "/forestbenefits.png",
                                "Forest benefits illustration"
                              )
                            }
                          />
                          <figcaption
                            style={{ fontSize: "0.7rem", textAlign: "center" }}
                          >
                            Click to enlarge
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "location" && (
                <div className="tab-panel" id="location">
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ flex: "1" }}>
                      <figure>
                        <img
                          src="/3dview.png"
                          alt="3D view of forest location"
                          style={{
                            width: "100%",
                            maxWidth: "830px",
                            height: "auto",
                            borderRadius: "8px",
                            // marginBottom: "0.6rem",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            openFullscreen(
                              "/3dview.png",
                              "3D view of forest location"
                            )
                          }
                        />
                        <figcaption
                          style={{ fontSize: "0.7rem", textAlign: "center" }}
                        >
                          3D view of forest location, click to enlarge
                        </figcaption>
                      </figure>
                      <br />
                      <div style={{ fontSize: "1.2rem", lineHeight: "1.5" }}>
                        <p>
                          <em>Diagram on right</em>: Mini-forest with surrounding mantle of perennials.
                          North and south native plant gardens outlined in blue.
                        </p>
                        <p style={{ fontSize: "1rem" }}>
                          Belmont High School's front lawn
                          <br />
                          221 Concord Ave, Belmont MA 02478
                        </p>
                        <p style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
                          <a
                            href="https://maps.app.goo.gl/oshWXVLb8u6Jf28d9"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Find on Google Maps
                          </a>
                        </p>
                      </div>
                    </div>
                    <figure>
                      <img
                        src="/2dview.png"
                        alt="2D view of forest location"
                        style={{
                          width: "300px",
                          height: "400px",
                          borderRadius: "8px",
                          flexShrink: 0,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          openFullscreen(
                            "/2dview.png",
                            "2D view of forest location"
                          )
                        }
                      />
                      <figcaption
                        style={{ fontSize: "0.7rem", textAlign: "center" }}
                      >
                        2D view of forest location, click to enlarge
                      </figcaption>
                    </figure>
                  </div>
                </div>
              )}

              {activeTab === "updates" && (
                <div className="tab-panel">
                  <div className="planting-day-hero">
                    <img src="/assets/planting.jpg" alt="Planting Day" />
                    <h2 className="planting-day-title">Planting Day</h2>
                  </div>
                  <h2>Latest Updates & Upcoming Events</h2>
                  <div className="timeline-compact">
                    <div className="timeline-item-compact completed">
                      <div className="timeline-date">July 2025</div>
                      <div className="timeline-content-compact">
                        <h4>Project Website Launch</h4>
                        <p>
                          Our official website is now live! Share it to help
                          spread awareness.
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
                          Training sessions for volunteers on planting
                          techniques.
                        </p>
                      </div>
                    </div>
                    <div className="timeline-item-compact upcoming">
                      <div className="timeline-date">October 2025</div>
                      <div className="timeline-content-compact">
                        <h4>Community Planting Day</h4>
                        <p>
                          Our planting date is Saturday, October 4th 2025 from
                          10 AM to 6 PM at the Triangle in front of Belmont High
                          School by Clay Pit Pond, 221 Concord Ave.
                          <br></br>
                          <br></br>Our rain date is October 5th
                          <br></br>
                          <br></br>
                          We are seeking volunteers to help bring Belmont's
                          first mini-forest to life by planting hundreds of
                          native plants. If you’d like to be part of this
                          transformative project, please fill out this sign-up
                          form to express your interest in volunteering. All
                          ages able to participate in planting are encouraged to
                          join!
                          <br></br>
                          <br></br>
                          The forest will need stewards and volunteers to plant
                          seedlings, spread mulch, and organize materials.
                          <br></br>
                          <br></br>
                          After the planting, for the next three growing
                          seasons, volunteers will maintain and monitor the
                          forest. This including weeding, litter removal and
                          data collection. More information on how to get
                          involved with post-planting will be released later!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "about" && (
                <div className="tab-panel">
                  <div className="gridz grid-2z">
                    <div>
                      <h3>Testimonials</h3>

                      <div className="team-list">
                        <p>
                          "I am extremely excited at the prospect of having this
                          forest established on the Belmont Highschool (BHS)
                          campus. My belief is that the Miyawaki forest project
                          will not only further enhance biodiversity at BHS, but
                          will continue to educate students and community
                          members about the benefits and beauty of creating
                          habitats for native plants and creatures, and
                          offsetting the impact of the constructed environment
                          such as runoff. The forest will also be a valuable
                          educational resource for the school. There are clear
                          benefits for a science and engineering curriculum,
                          which are enhanced by opportunities to observe and
                          collect data from the natural world. But beyond that,
                          the space can be used for mindfulness, creative
                          inspiration, and reflection. My support for this
                          program is unequivocal..."<br></br>
                          <br></br>
                          <strong>
                            Isaac Taylor, Principal, Belmont High School
                          </strong>
                        </p>
                        <p>
                          "Belmont's Shade Tree Committee heartily endorses the
                          Miyawaki forest project at the high school. The
                          Miyawaki forest will grow faster than traditional
                          plantings, creating a dense micro forest in just a few
                          years. Native trees and shrubs will increase the
                          diversity of Belmont's canopy (in keeping with a 2023
                          recommendation from the town tree inventory report!)
                          and will support local wildlife. It's a wonderful
                          opportunity to engage students townwide, as well as
                          the community at large. Generations of Belmont
                          residents will benefit from the forest for years to
                          come."<br></br>
                          <br></br>
                          <strong>Belmont Shade Tree Committee</strong>
                        </p>
                      </div>
                    </div>
                    <br></br>

                    <div>
                      <h3>Community Supporters</h3>
                      <p>
                        This project is made possible by the generous support of
                        our community members, and environmental advocates who
                        believe in creating a greener future.
                      </p>
                      <br />
                      <div
                        className="grid grid-2"
                        style={{ marginLeft: "7rem" }}
                      >
                        {supporters.length > 0 ? (
                          <>
                            <div>
                              <ul>
                                {supporters
                                  .slice(0, Math.ceil(supporters.length / 2))
                                  .map((supporter, index) => (
                                    <li key={index}>{supporter.name}</li>
                                  ))}
                              </ul>
                            </div>
                            <div>
                              <ul>
                                {supporters
                                  .slice(Math.ceil(supporters.length / 2))
                                  .map((supporter, index) => (
                                    <li
                                      key={
                                        index + Math.ceil(supporters.length / 2)
                                      }
                                    >
                                      {supporter.name}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <div>
                            <p>Loading supporters...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div className="modal-overlay" onClick={closeFullscreen}>
          <div
            className="fullscreen-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeFullscreen}>
              <X size={24} />
            </button>
            <img
              src={fullscreenImage.src}
              alt={fullscreenImage.alt}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "95vw",
                maxHeight: "95vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      )}

      {/* Resources Section */}
      <section className="ready-difference-section">
        <div className="container ready-difference-buttons-wrap ready-difference-home-layout" style={{ width: "100%" }}>
          <div className="ready-difference-copy">
            <h2>Ready to Make a Difference?</h2>
            <p>
              Your support will benefit the<br /> forest. Improving both human<br /> and non-human communities.
            </p>
          </div>
          <div className="ready-difference-actions ready-difference-actions-corner">
            <button onClick={handleDonateClick} className="btn btn-primary">
              <ExternalLink size={20} />
              Donate To Support Our Forest
            </button>
            <button
              onClick={handleVolunteerClick}
              className="btn btn-secondary"
            >
              <ExternalLink size={20} />
              Join Us As a Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* Guestbook */}
      <Guestbook />
    </div>
  );
}

export default Home;
