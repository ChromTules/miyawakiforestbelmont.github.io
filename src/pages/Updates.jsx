import {
  Calendar,
  CheckCircle,
  Clock,
  Users,
  TreePine,
  Target,
  ExternalLink
} from "lucide-react";
import { useState, useEffect } from "react";
import Guestbook from "../components/Guestbook";
import { Chrono } from "react-chrono";

function Updates() {
  const [timelineUpdates, setTimelineUpdates] = useState([]);
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Your existing hardcoded timeline data as fallback
  const fallbackUpdates = [
    {
      id: 1,
      date: "July 2025",
      title: "Project Website Launch !!!",
      description:
        "Our official website is now live! Share it with friends and family to help spread awareness about our Miyawaki forest project.",
      status: "completed",
      icon: <CheckCircle size={24} />,
    },
    {
      id: 2,
      date: "June 2025",
      title: "Site Selection Completed",
      description:
        "After careful evaluation, we have selected the perfect 3,000 sq ft location on the school campus for our forest. The site receives optimal sunlight and has good drainage.",
      status: "completed",
      icon: <CheckCircle size={24} />,
    },
    {
      id: 3,
      date: "May 2025",
      title: "Native Species Research",
      description:
        "Our team has identified 15 native tree and shrub species that will thrive in our local climate and provide maximum biodiversity benefits.",
      status: "completed",
      icon: <CheckCircle size={24} />,
    },
    {
      id: 4,
      date: "April 2025",
      title: "Planning Begins",
      description:
        "Official project launch! Community meetings held to discuss the vision, gather support, and begin the planning process for our Miyawaki forest.",
      status: "completed",
      icon: <CheckCircle size={24} />,
    },
    {
      id: 5,
      date: "August 2025",
      title: "Volunteer Training Program",
      description:
        "We are organizing training sessions for volunteers to learn about the Miyawaki method, proper planting techniques, and forest maintenance.",
      status: "upcoming",
      icon: <Clock size={24} />,
    },
    {
      id: 6,
      date: "September 2025",
      title: "Soil Preparation",
      description:
        "Begin soil analysis and preparation work. We will test soil composition and add organic materials to create optimal growing conditions.",
      status: "upcoming",
      icon: <Clock size={24} />,
    },
    {
      id: 7,
      date: "October 2025",
      title: "Community Planting Day",
      description:
        "The big day! Students, families, and community volunteers come together to plant our Miyawaki forest in a single day event.",
      status: "upcoming",
      icon: <TreePine size={24} />,
    },
  ];

  const items = [
    {
      title: "November 12, 2024",
      cardTitle: "School Committee Meeting",
    },
    {
      title: "April 23, 2025",
      cardTitle: "Potential Natural Vegetation Research for the Planting List ",
      cardSubtitle: "Research Phase",
      cardDetailedText:
        "Based on the soil conditions at the Belmont High School site, botanist Walter Kittredge recommended using a High-terrace Floodplain Forest as a model. This forest community now serves as the reference and inspiration for our planting list.",
    },
    {
      title: "March 26, 2025",
      cardTitle: "Site Assessment",
      cardSubtitle: "Assessment",
      cardDetailedText:
        "While assessing the soil with Bio4Climate, we encountered a layer of clay at a depth of ~12 inches. A lab test of the soil showed that the top layer is sandy loam. We confirmed the soil texture with a simple ribbon test. We then surveyed the existing vegetation on the site, around the pond, and in a nearby grove as part of our Potential Natural Vegetation (PNV) research",
    },
    {
      title: "October 4th, 2025",
      cardTitle: "Community Planting Day",
    },
    // {
    //   title: "Future",
    //   cardTitle: "Perennial Collar Installation",
    // },
  ];

  const customForestTheme = {
    // Base colors - lighter for better readability
    cardBgColor: "#ffffff", // Pure white for cards
    toolbarBgColor: "#ffffff", // White toolbar
    toolbarBtnBgColor: "#f8f9fa", // Light gray for toolbar buttons

    // Enhanced theme properties with lighter forest colors
    iconColor: "#28502e", // --forest-green for better contrast
    buttonHoverBgColor: "#e8f5e8", // Very light green hover
    buttonActiveBgColor: "#47682c", // --sage-green active state
    buttonActiveIconColor: "#ffffff", // White icon on sage-green

    // Borders and effects using lighter forest theme
    buttonBorderColor: "rgba(40, 80, 46, 0.1)", // Very light forest-green border
    buttonHoverBorderColor: "#47682c", // --sage-green
    shadowColor: "rgba(27, 47, 51, 0.1)", // Very light shadow
    glowColor: "rgba(71, 104, 44, 0.2)", // Light sage-green glow

    // Search and dark toggle with lighter colors
    searchHighlightColor: "rgba(71, 104, 44, 0.1)", // Very light sage-green
    darkToggleActiveBgColor: "#f8f9fa", // Light gray
    darkToggleActiveIconColor: "#28502e", // Forest-green icon

    // Text colors - darker for readability
    titleColor: "#1b2f33", // --text-dark for good contrast
    titleColorActive: "#28502e", // --forest-green
    cardTitleColor: "#1b2f33", // --text-dark
    cardSubtitleColor: "#47682c", // --text-light
    cardTextColor: "#1b2f33", // --text-dark

    // Additional light theme properties
    primary: "#28502e", // --forest-green
    secondary: "#47682c", // --sage-green
    background: "#ffffff", // White background
    foreground: "#1b2f33", // Dark text
  };

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

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load timeline updates from CMS (if they exist)
        try {
          const timelineData = await import("../content/timeline.json");
          if (timelineData.updates || timelineData.default.updates) {
            const updatesWithIcons = timelineData.updates.map((update) => ({
              ...update,
              icon:
                update.status === "completed" ? (
                  <CheckCircle size={24} />
                ) : update.status === "upcoming" ? (
                  <Clock size={24} />
                ) : (
                  <TreePine size={24} />
                ),
            }));
            setTimelineUpdates(updatesWithIcons);
          } else {
            setTimelineUpdates(fallbackUpdates);
          }
        } catch (error) {
          console.log("No timeline.json found, using fallback data");
          setTimelineUpdates(fallbackUpdates);
        }

        // Load news updates from CMS
        try {
          const newsModules = import.meta.glob("../content/updates/*.json");
          const newsPromises = Object.entries(newsModules).map(
            async ([path, importFn]) => {
              const updateData = await importFn();
              const filename = path.split("/").pop().replace(".json", "");

              return {
                ...updateData.default,
                slug: filename,
              };
            }
          );

          const loadedNews = await Promise.all(newsPromises);
          // Sort by date, newest first
          loadedNews.sort((a, b) => new Date(b.date) - new Date(a.date));
          setNewsUpdates(loadedNews);
        } catch (error) {
          console.log("No news updates found");
          setNewsUpdates([]);
        }
      } catch (error) {
        console.error("Error loading content:", error);
        setTimelineUpdates(fallbackUpdates);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const completedUpdates = timelineUpdates.filter(
    (update) => update.status === "completed"
  );
  const upcomingUpdates = timelineUpdates.filter(
    (update) => update.status === "upcoming"
  );

  if (loading) {
    return (
      <div className="updates">
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>Loading Updates...</h1>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="updates">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>News Archive</h1>
            <p className="subtitle" style={{ paddingTop: "40px" }}>
              Our news and publicity for the forest
            </p>
          </div>
        </div>
      </section>

      


      {/* CMS News Updates */}
      {newsUpdates.length > 0 && (
        <section>
          <div className="container">
            <h2>Latest News</h2>
            <div className="grid grid-2">
              {newsUpdates.slice(0, 4).map((update) => (
                <div key={update.slug} className="card">
                  {update.featured_image && (
                    <img
                      src={update.featured_image}
                      alt={update.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "1rem",
                      }}
                    />
                  )}
                  <h3>{update.title}</h3>
                  <p
                    style={{
                      color: "var(--text-light)",
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {new Date(update.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>{update.summary}</p>
                  {update.tags && update.tags.length > 0 && (
                    <div style={{ marginTop: "1rem" }}>
                      {update.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            display: "inline-block",
                            padding: "0.25rem 0.5rem",
                            margin: "0.25rem 0.25rem 0 0",
                            backgroundColor: "rgba(45, 90, 61, 0.1)",
                            color: "var(--forest-green)",
                            borderRadius: "12px",
                            fontSize: "0.8rem",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        
      )}
      {/* Resources Section */}
      <section className="ready-difference-section">
        <div className="container" style={{ width: "100%" }}>
          <div className="ready-difference-overlay">
            <h2>Ready to Make a Difference?</h2>
            <p>
              Your support will benefit the<br /> forest, improving both human<br /> and non-human communities.
            </p>
            <div className="ready-difference-actions">
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
            <br />

            <div className="ready-difference-contact">
              <h4>Have questions about volunteering and more?</h4>
              <p>
                Contact Us:{" "}
                <a href="mailto:miniforestbelmont@gmail.com">
                  miniforestbelmont@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guestbook */}
      <Guestbook />
    </div>
  );
}

export default Updates;
