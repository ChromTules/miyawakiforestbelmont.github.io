import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Send,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import Guestbook from "../components/Guestbook";
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [openFAQ, setOpenFAQ] = useState(null);
  const [modalFAQ, setModalFAQ] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  const toggleFAQ = (index) => {
    setModalFAQ(index);
  };

  const closeModal = () => {
    setModalFAQ(null);
  };

  const faqData = [
    {
      question: "Why was the forest planted?",
      answer: "The Miyawaki Forest at Belmont High School was planted to create a biodiverse native ecosystem that will provide numerous environmental benefits including stormwater management, air and water filtration, noise reduction, cooling during heat waves, and critical habitat for pollinators and birds. Additionally, it serves as a living laboratory for students and the community to learn about environmental stewardship and native ecosystems."
    },
    {
      question: "What is the Miyawaki method?",
      answer: "The Miyawaki method, developed by Japanese botanist Dr. Akira Miyawaki, creates dense native forests by planting seedlings closely together (3-5 per square meter) after extensive soil preparation. This technique mimics natural forest succession, allowing forests to grow 10 times faster, become 30 times denser, and develop into self-sustaining ecosystems in just 3 years instead of several decades."
    },
    {
      question: "How much carbon is the forest expected to sequester?",
      answer: "Miyawaki forests can sequester up to 10 times more carbon than conventional plantings due to their density and rapid growth rate. Our 3,000 square foot forest with over 1,100 trees is expected to sequester several tons of carbon dioxide over its lifetime, with the majority of sequestration occurring in the first 20-30 years as the forest matures."
    },
    {
      question: "How do we measure carbon sequestration, water absorption, atmospheric cooling, and wildlife?",
      answer: "We plan to work with students and researchers to monitor the forest's environmental impact through various methods: periodic tree measurements for biomass and carbon calculations, soil moisture sensors and rain gauge measurements for water absorption, temperature sensors to track cooling effects, and wildlife cameras plus biodiversity surveys to document animal and insect populations."
    },
    {
      question: "How much did it cost to plant? Where did the money come from?",
      answer: "The project was funded through generous donations from community members, local businesses, and environmental advocates who believe in creating a greener future. Costs included soil preparation, native plant saplings, mulch, fencing, and professional consultation from Biodiversity for a Livable Climate. We continue to accept donations to support ongoing maintenance and monitoring."
    },
    {
      question: "What kind of soil preparation was done?",
      answer: "Following soil testing that revealed sandy loam composition, we amended the soil with organic matter including compost, leaf mold, and other natural materials to improve water retention, nutrient content, and microbial activity. The soil was loosened to a depth of 3 feet to encourage deep root growth, creating optimal conditions for our native species to thrive in Belmont's climate."
    },
    {
      question: "What kind of studies are planned for the forest?",
      answer: "The forest will serve as an outdoor classroom for long-term ecological research. Planned studies include growth rate monitoring, biodiversity assessments, carbon sequestration measurements, soil health analysis, water infiltration studies, microclimate effects, and pollinator population surveys. These studies will provide valuable data on urban forest restoration and native ecosystem development."
    },
    {
      question: "Why is there a fence around the forest?",
      answer: "The fence protects the young forest during its critical first three years of establishment. It prevents trampling, keeps out deer and other animals that might browse the saplings, and clearly delineates the forest area. Once the forest is self-sustaining and the trees are well-established, the fence may be modified or removed to allow greater access for educational purposes."
    },
    {
      question: "How fast is the forest expected to grow?",
      answer: "Using the Miyawaki method, our forest will grow significantly faster than traditional plantings—about 10 times the normal rate. The trees will reach heights of 10-15 feet within 3 years, and the forest will become a mature, self-sustaining ecosystem within 20-30 years, compared to 200-300 years for naturally occurring forests. By year 3, you'll see a dense, multi-layered canopy."
    },
    {
      question: "How can I volunteer?",
      answer: (
        <>
          To help us maintain the forest, please fill out our{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScEmt1Bg0T-mhlZ_dE6TRlVrZ7EQ34nygG8D-ELzAwk5Alkzw/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            Volunteer Form
          </a>
          . You will be weeding, monitoring, mulching, and more. Sign up and stayed tuned for more information.
        </>
      )
    },
    {
      question: "How much maintenance will the forest require?",
      answer: "Miyawaki forests require regular maintenance for the first 3 years post planting, including watering, weeding, and mulching. After that, they become completely self-sustaining ecosystems. Please look out for more information on how to volunteer soon."
    },
    {
      question: "Why is the forest located at the High School?",
      answer: "The forest will serve as a living laboratory for students to interact, study, and be hands-on with nature. This resource can be integrated into different curriculums throughout K-12. Students learning about the symbiotic relationships in our environment in science class will be able to observe them first hand in the forest. Humanities and art classes can use the forest as inspiration for creative assignments and so on."
    },
    {
      question: "What native species will be planted?",
      answer: (
        <>
          With Biodiversity for a Livable Climate, we carried out a site visit to assess the soil at the High School. A lab test of the soil showed that the top layer is sandy loam, a wet, permeable type of soil. With this in mind, plus our survey of the existing vegetation on the site, around the pond, and in a nearby grove as part of our Potential Natural Vegetation (PNV) research, we created a{" "}
          <a
            href="https://docs.google.com/document/d/1OHeL-6ni_3HXtFmkH7escEsVIfNIICZ8LTTFS8KppNY/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            plant list
          </a>{" "}
          with native species that would be suitable for this environment.
        </>
      )
    }
  ];

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Contact Us</h1>
            <p className="subtitle" style={{ paddingTop: "40px" }}>
              Get in touch with the Miyawaki Forest Action Belmont team
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Team */}
      <section>
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h2>Get in Touch</h2>
              <p>
                Have questions about our project? Want to learn more about how
                you can help? Reach out to our email
              </p>

              <div className="contact-info">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <div>
                    <strong>Email</strong>
                    <p>miniforestbelmont@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card" style={{ textAlign: "center" }} id="about">
              <h2>Our Team</h2>
              <p>
                Miyawaki Forest Action Belmont (MFAB) is an intergenerational
                group of local residents dedicated to establishing Miyawaki
                forests in Belmont. Our focus is on education and community
                building, providing Belmont a hands-on place to learn about
                environmental stewardship and biodiversity.
              </p>
              <p>
                This forest is brought together with Biodiversity For a Livable
                Climate, installer of Miyawaki Forests. Visit this{" "}
                <a
                  href="https://bio4climate.org/miyawaki-forest-program/belmont-high-school-microforest/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link
                </a>{" "}
                to see our page on bio4climate.
              </p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <h2>Project Leadership</h2>
              <br />
              <div style={{ fontSize: "1.5rem", lineHeight: "1.6" }}>
                Jean Devine <br />
                Jess Hausman <br />
                Ralph Jones <br />
                Holly Kong <br />
                Anne-Marie Lambert <br />
                Ranganath Nayak <br />
                Michelle Oishi <br />
                AJ Shaw <br />
                Jessica Birte Smith <br />
                Kirsten Waerstad <br />
                Sarah Wang <br />
                Jason Zhao <br />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-alt">
        <div className="container">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-grid">
            {faqData.map((faq, index) => (
              <div key={index}>
                <div
                  onClick={() => toggleFAQ(index)}
                  className="faq-card"
                  style={{
                    backgroundColor: "white",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "160px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <h3 style={{ 
                    color: "var(--forest-green)", 
                    fontSize: "1.1rem", 
                    margin: "0",
                    fontWeight: "600"
                  }}>
                    {faq.question}
                  </h3>
                  <span 
                    style={{ 
                      marginTop: "0.5rem",
                      color: "#999",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      transition: "color 0.3s ease"
                    }} 
                  >
                    Click to read answer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for FAQ */}
      {modalFAQ !== null && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "2rem",
            animation: "fadeIn 0.3s ease"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: "2.5rem",
              borderRadius: "12px",
              maxWidth: "700px",
              maxHeight: "80vh",
              overflow: "auto",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              animation: "slideUp 0.3s ease",
              position: "relative"
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#666",
                padding: "0.5rem",
                lineHeight: 1
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--forest-green)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#666"}
            >
              ×
            </button>
            <h2 style={{ 
              color: "var(--forest-green)", 
              marginBottom: "1.5rem",
              paddingRight: "2rem"
            }}>
              {faqData[modalFAQ].question}
            </h2>
            <p style={{ 
              lineHeight: "1.8", 
              color: "#333",
              fontSize: "1.05rem"
            }}>
              {faqData[modalFAQ].answer}
            </p>
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

export default Contact;