import { useEffect, useState } from "react";
import {
  Heart,
  User,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Guestbook from "../components/Guestbook";

function Fosters() {
  const [fosterTreePeople, setFosterTreePeople] = useState([]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const fosterData = await import("../content/fostered.json");
        if (fosterData.images && fosterData.images.length > 0) {
          setFosterTreePeople(fosterData.images);
        } else {
          // Fallback data if no fostered.json or empty
          setFosterTreePeople([
            {
              id: 1,
              name: "Sarah Johnson",
              location: "Downtown",
              image: "/assets/images/heather_tree.jpg",
              message: "Excited to help grow our community forest!",
              treeType: "Oak Sapling",
            },
            {
              id: 2,
              name: "Mike Chen",
              location: "Riverside",
              image: "/api/placeholder/200/200",
              message: "For my children's future and cleaner air.",
              treeType: "Maple Sapling",
            },
          ]);
        }
      } catch (error) {
        console.log("No fostered.json found, using fallback data");
        // Fallback data
        setFosterTreePeople([
          {
            id: 1,
            name: "Sarah Johnson",
            location: "Downtown",
            image: "/assets/images/heather_tree.jpg",
            message: "Excited to help grow our community forest!",
            treeType: "Oak Sapling",
          },
          {
            id: 2,
            name: "Mike Chen",
            location: "Riverside",
            image: "/api/placeholder/200/200",
            message: "For my children's future and cleaner air.",
            treeType: "Maple Sapling",
          },
        ]);
      }
    };
    loadContent();
  }, []);

  const handleSubmitClick = () => {
    window.open("https://forms.gle/faXNcHmNKQviMfPt9", "_blank");
  };
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(fosterTreePeople.length / photosPerPage);
  const startIndex = (currentPage - 1) * photosPerPage;
  const endIndex = startIndex + photosPerPage;
  const currentPhotos = fosterTreePeople.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
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
  

  return (
    <div className="gallery">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Our Fosters</h1>
            <p className="subtitle" style={{ paddingTop: "40px" }}>
              Meet the amazing people who are fostering saplings for our
              Miyawaki forest
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section>
        <div className="container">
          <h2>Fosters</h2>
          <p style={{ fontStyle: "italic", color: "#666", marginTop: "-0.5rem" }}>
            Click to Enlarge
          </p>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div
              className="pagination-controls"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <button
                onClick={goToPrevPage}
                className="pagination-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--forest-green)",
                  color: "white",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "var(--sage-green)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "var(--forest-green)")
                }
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <div
                className="page-indicators"
                style={{
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => goToPage(index + 1)}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "none",
                      backgroundColor:
                        currentPage === index + 1
                          ? "var(--forest-green)"
                          : "var(--sage-green)",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease",
                      transform:
                        currentPage === index + 1 ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={goToNextPage}
                className="pagination-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--forest-green)",
                  color: "white",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "var(--sage-green)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "var(--forest-green)")
                }
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          <div className="gallery-grid">
            {/* Program Description Card */}
            <div
              className="gallery-card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "2rem",
                backgroundColor: "var(--cream)",
                minHeight: "200px",
              }}
            >
              <p style={{ fontSize: "1.1rem", lineHeight: "1.6", margin: 0, color:"#496914" }}>
                The Foster a Tree Program introduced over <strong style={{ fontSize: "1.3rem" }}>100 saplings</strong> to
                Belmont residents to take care of in the summer of 2025.
                <br />
                <br />
                By fostering, they not only supported MFAB's project, but also
                became part of a community of environmental stewards dedicated
                to creating a greener future.
              </p>
            </div>

            {/* Foster Photos */}
            {currentPhotos.map((person) => (
              <div
                key={person.id}
                className="gallery-card"
                onClick={() => setSelectedPerson(person)}
                style={{ cursor: "pointer" }}
              >
                <div className="gallery-image">
                  <img
                    src={
                      person.image.startsWith("public/")
                        ? person.image.split("public/")[1]
                        : person.image
                    }
                    alt={`${person.name} - Foster Tree Parent`}
                  />
                  {/* <div className="gallery-overlay">
                    <h4>{person.name}</h4>
                    <p>
                      <MapPin size={16} /> {person.location}
                    </p>
                  </div> */}
                </div>
                <div className="gallery-info">
                  <p style={{fontSize:"1.5rem"}}>{person.name}</p>
                  <p style={{fontSize:"1.1rem", marginBottom:"0.2rem"}}>{person.treeType}</p>
                  {/* <p className="message">{person.message}</p>
                  <div className="location">
                    <MapPin size={14} />
                    <span>{person.location}</span>
                  </div> */}
                </div>
              </div>
            ))}
          </div>

          {/* Page Info */}
          {totalPages > 1 && (
            <div
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                color: "var(--text-light)",
                fontSize: "0.9rem",
              }}
            >
              Showing {startIndex + 1}-
              {Math.min(endIndex, fosterTreePeople.length)} of{" "}
              {fosterTreePeople.length} foster tree parents
            </div>
          )}
        </div>
      </section>

      {/* Submit your own */}
      <div
        className="cta-buttons"
        style={{ textAlign: "center", justifyContent: "center", margin: "0 auto", padding: "0 1rem" }}
      >
        <button onClick={handleSubmitClick} className="btn btn-primary">
          <ExternalLink size={20} />
          Submit Your Own Pictures
        </button>
        <br />
      </div>


      {/* Modal for selected person */}
      {selectedPerson && (
        <div className="modal-overlay" onClick={() => setSelectedPerson(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedPerson(null)}
            >
              ×
            </button>
            <div className="modal-body">
              <img
                src={
                  selectedPerson.image.startsWith("public/")
                    ? selectedPerson.image.split("public/")[1]
                    : selectedPerson.image
                }
                alt={selectedPerson.name}
                className="modal-image"
              />
              <div className="modal-info">
                <h3>{selectedPerson.name}</h3>
                <p className="modal-tree-type">{selectedPerson.treeType}</p>
                <div className="modal-location">
                  <MapPin size={16} />
                  <span>{selectedPerson.location}</span>
                </div>
                <p className="modal-message">"{selectedPerson.message}"</p>
              </div>
            </div>
          </div>
        </div>
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

export default Fosters;
