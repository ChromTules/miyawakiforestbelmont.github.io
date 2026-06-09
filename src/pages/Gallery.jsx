import { useEffect, useState } from "react";
import {
  MapPin,
  ExternalLink
} from "lucide-react";
import Guestbook from "../components/Guestbook";

function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleSubmitClick = () => {
    window.open("https://forms.gle/faXNcHmNKQviMfPt9", "_blank");
  };

  return (
    <div className="gallery">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Photos</h1>
            <p className="subtitle" style={{ paddingTop: "40px" }}>
             Documenting our forest together as it grows
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section>
        <div className="container">

          
          <div style={{ 
            backgroundColor: "white", 
            padding: "1.5rem", 
            borderRadius: "8px", 
            marginBottom: "2rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.7)"
          }}>
            <p style={{ margin: 0, textAlign: "center", color: "#131313" }}>
              To view more photos from our site visits, pre-planting and post-planting, planting day, and more, visit this{" "}
              <a 
                href="https://drive.google.com/drive/folders/1cADl3kJpkhvnod9IyHFp3ikT5oIBrJet?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "#719354", textDecoration: "underline" }}
              >
                link
              </a>.
            </p>
          </div>
          <p style={{ fontStyle: "italic", color: "#666", marginTop: "1rem", marginBottom: "1.5rem" }}>
            Click to Enlarge
          </p>
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
              <div className="gallery-grid">
                {galleryImages.map((item) => (
                  <div
                    key={item.date}
                    className="gallery-card"
                    onClick={() => setSelectedImage(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="gallery-image" style={{ position: "relative", width: "100%", paddingTop: "75%", overflow: "hidden", borderRadius: "8px 8px 0 0" }}>
                      <img
                        src={
                          item.image.startsWith("public/assets/images/")
                            ? item.image.split("public/")[1]
                            : item.image
                        }
                        alt={`Progress update`}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
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
            </>
          )}
        </div>
      </section>


      {/* About Progress Updates */}
      <section>
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
                style={{
                  maxWidth: "100%",
                  maxHeight: "70vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
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

export default Gallery;
