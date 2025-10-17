import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  ExternalLink,
} from "lucide-react";

function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  useEffect(() => {
    const loadContent = async () => {
      try {
        const galleryData = await import("../content/gallery.json");
        if (galleryData.images) {
          setGalleryImages(galleryData.images.reverse());
        }
      } catch (error) {
        console.log("No gallery.json found, using empty array");
        setGalleryImages([]);
      }
    };
    loadContent();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = galleryImages.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmitClick = () => {
    window.open("https://forms.gle/faXNcHmNKQviMfPt9", "_blank");
  };

  return (
    <div className="gallery">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Progress Gallery</h1>
            <p className="subtitle" style={{ paddingTop: "40px" }}>
              Follow our journey as we grow the Miyawaki forest together
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section>
        <div className="container">
          <h2>Photos</h2>
          Click to Enlarge

          {galleryImages.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "var(--text-light)",
              }}
            >
              <p>
                No gallery images available yet. Check back soon for updates!
              </p>
            </div>
          ) : (
            <>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div
                  className="pagination-controls"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
                      backgroundColor: "#458115ff",
                      color: "white",
                      border: "none",
                      borderRadius: "25px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#7fab5b")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#458115ff")
                    }
                  >
                    <ChevronLeft size={16} />
                    
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
                              ? "#458115ff"
                              : "#7fab5b",
                          color: "white",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          transition: "all 0.3s ease",
                          transform:
                            currentPage === index + 1
                              ? "scale(1.1)"
                              : "scale(1)",
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
                      backgroundColor: "#458115ff",
                      color: "white",
                      border: "none",
                      borderRadius: "25px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#7fab5b")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#458115ff")
                    }
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              <div className="gallery-grid">
                {currentImages.map((item) => (
                  <div
                    key={item.id}
                    className="gallery-card"
                    onClick={() => setSelectedImage(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="gallery-image">
                      <img
                        src={
                          item.image.startsWith("public/assets/images/")
                            ? item.image.split("public/")[1]
                            : item.image
                        }
                        alt={`Progress update ${item.id}`}
                        // style={{
                        //   width: "100%",
                        //   height: "200px",
                        //   objectFit: "cover",
                        //   borderRadius: "8px 8px 0 0",
                        // }}
                      />
                      {/* <div className="gallery-overlay">
                        <h4>Update #{item.id}</h4>
                        <p>
                          <MapPin size={16} /> {item.location}
                        </p>
                      </div> */}
                    </div>
                    <div className="gallery-info">
                      <h4>Progress Update</h4>
                      <p className="message">{item.message}</p>
                      <div className="location">
                        <MapPin size={14} />
                        <span>{item.date}</span>
                      </div>
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
                  {Math.min(endIndex, galleryImages.length)} of{" "}
                  {galleryImages.length} progress updates
                </div>
              )}
            </>
          )}
        </div>
      </section>


      {/* About Progress Updates */}
      <section className="section-alt">
        <div className="container">
          <div
            className="card"
            style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
          >
            <h2>Share Your Progress</h2>
            <p>
              Help document our forest's journey! Share photos of site
              preparation, planting events, tree growth, or any other project
              milestones. Your contributions help build a visual timeline of our
              community's environmental impact.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <button className="btn btn-primary" onClick={handleSubmitClick}>
                Share Your Photos
              </button>
            </div>
            <div
              style={{
                marginTop: "1rem",
                fontSize: "0.9rem",
                color: "var(--text-light)",
              }}
            >
              <p>We welcome all types of progress documentation:</p>
              <ul
                style={{ listStyle: "none", padding: 0, marginTop: "0.5rem" }}
              >
                <li>• Site preparation and soil work</li>
                <li>• Planting day activities</li>
                <li>• Tree growth over time</li>
                <li>• Community engagement events</li>
                <li>• Before and after comparisons</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for selected image */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <div className="modal-body">
              <img
                src={
                  selectedImage.image.startsWith("public/")
                    ? selectedImage.image.split("public/")[1]
                    : selectedImage.image
                }
                alt={`Progress update ${selectedImage.id}`}
                className="modal-image"
              />
              <div className="modal-info">
                <h3>Progress Update #{selectedImage.id}</h3>
                <div className="modal-location">
                  <MapPin size={16} />
                  <span>{selectedImage.location}</span>
                </div>
                <p className="modal-message">"{selectedImage.message}"</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
