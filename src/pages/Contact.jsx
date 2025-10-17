import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Send,
  ExternalLink,
} from "lucide-react";
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
                Climate, installer of Miyawaki Forests.
              </p>
            </div>
            <div className="card">
              <h2>References and Resources</h2>
              <ul>
                <li>
                  <a
                    href="https://homegrownnationalpark.org/symbiotic-schoolyard/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Homegrown National Park
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.sugiproject.com/forests/danehy-park-forest"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SUGi
                  </a>
                </li>
                <li>
                  <a
                    href="https://bio4climate.org/miyawaki-forest-program/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bio4Climate Miyawaki Forest Program
                  </a>
                </li>
                <li>
                  <a
                    href="https://pixnio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Photo by Hagerty Ryan, USFWS
                  </a>
                </li>
                <li>Image from Google Maps - last update 2022</li>
                <li>
                  Bio4Climate's{" "}
                  <a
                    href="https://www.youtube.com/playlist?list=PLsWWRqCX9eSaeVvsc-zUsK4HPt0enmRcc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Miyawaki Forest video playlist
                  </a>
                </li>
                <li>
                  '
                  <a
                    href="https://www.csmonitor.com/Environment/2023/0922/Miyawaki-A-little-forest-with-a-towering-task-video"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    A Little Forest with a Towering Task
                  </a>
                  ' - Short documentary on the Miyawaki planting process and the
                  'grounded hope' behind the work
                </li>
                <li>
                  '
                  <a
                    href="https://www.nytimes.com/2023/08/24/climate/tiny-forests-climate-miyawaki.html?unlocked_article_code=S_xwWpdQcIVJSDpMaNcyo-EH_Y2Lw6tOH6xwX_NE6AwkO_FWy8YH_hJdLatSfnn70lg8twstZFrav63MlEM9pPc3d6092cif7kGnuhiFYu8NzMbHBdgveuElb7HdfFvnhIAV_hsq9oaiWB6w00t92Drj7pbUnnzbP-oGoRY4sr0Kx5BXcr0VCLzL7CYXyvYfIoBcZVe9h_9MKEl9f-yEcz_Li0NKOGKr7Bmuch0m6RkWl3sd6AK0WKXd6joit-Q3tAJlQdA-EozMxnFNbRGedk_Iwtq_XUlOUzNuaBELtI6OvvoxJOCl1UVvKsY3KoBg3PCn1xNZmmwtdW8FIDBN_kx5BfQY-WU&smid=url-share"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tiny Forests with Big Benefits
                  </a>
                  ' - A feature of our Cambridge forests and other Miyawaki
                  plantings in <em>The New York Times</em>
                </li>
                <li>
                  <em>
                    <a
                      href="https://www.chelseagreen.com/product/mini-forest-revolution/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mini-Forest Revolution: Using the Miyawaki Method to
                      Rapidly Rewild the World
                    </a>
                  </em>{" "}
                  by Hannah Lewis, published by Chelsea Green in June 2022
                </li>
              </ul>
            </div>

            <div className="card" style={{ textAlign: "center" }}>
              <h2>Project Leadership</h2>
              <br />
              <div style={{ fontSize: "1.8rem", lineHeight: "1.4" }}>
                Jean Devine <br />
                Jess Hausman <br />
                Ralph Jones <br />
                Holly Kong <br />
                Anne-Marie Lambert <br />
                Ranganath Nayak <br />
                Michelle Oishi <br />
                Kirsten Waerstad <br />
                Sarah Wang <br />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-alt">
        <div className="container">
          <h2>Frequently Asked Questions</h2>

          <div className="grid grid-2" style={{ marginTop: "2rem" }}>
            <div className="card">
              <h3>How can I volunteer?</h3>
              <p>
                To help us maintain the forest, please fill out our{" "}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScEmt1Bg0T-mhlZ_dE6TRlVrZ7EQ34nygG8D-ELzAwk5Alkzw/viewform"
                  target="_blank"
                >
                  Volunteer Form
                </a>
                . You will be weeding, monitoring, mulching, and more. Sign up and stayed tuned for more information.
              </p>
            </div>

            <div className="card">
              <h3>Why is the forest located at the High School?</h3>
              <p>
                The forest will serve as a living laboratory for students to
                interact, study, and be hands-on with nature.
                <br />
                <br />
                This resource can be integrated into different curriculums
                throughout K-12. Students learning about the symbiotic
                relationships in our environment in science class will be able
                to observe them first hand in the forest. Humanities and art
                classes can use the forest as inspiration for creative
                assignments and so on.
              </p>
            </div>

            <div className="card">
              <h3>How much maintenance will the forest require?</h3>
              <p>
                Miyawaki forests require regular maintenance for the first 3
                years post planting, including watering, weeding, and mulching.
                After that, they become completely self-sustaining ecosystems.
                <br />
                <br />
                Please look out for more information on how to volunteer soon.
              </p>
            </div>

            <div className="card">
              <h3>What native species will be planted?</h3>
              <p>
                With Biodiversity for a Livable Climate, we carried out a site
                visit to assess the soil at the High School. A lab test of the
                soil showed that the top layer is sandy loam, a wet, permeable
                type of soil. With this in mind, plus our survey of the existing
                vegetation on the site, around the pond, and in a nearby grove
                as part of our Potential Natural Vegetation (PNV) research, we
                created a{" "}
                <a
                  href="https://docs.google.com/document/d/1OHeL-6ni_3HXtFmkH7escEsVIfNIICZ8LTTFS8KppNY/edit?tab=t.0"
                  target="_blank"
                >
                  plant list
                </a>{" "}
                with native species that would be suitable for this environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section-alt">
        <div className="container">
          <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2>Ready to Make a Difference?</h2>
            <p>
              Your support will turn this forest into reality, benefitting both
              human and non-human communities.
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
            <br />

            <div
              className="contact-info"
              style={{ textAlign: "center", marginTop: "30px" }}
            >
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
    </div>
  );
}

export default Contact;
