import { Mail, Github, Twitter, Facebook } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img
                src="/logo.png"
                alt="Miyawaki Forest Action Belmont Logo"
                style={{ height: "32px", width: "auto" }}
              />
              <span>Miyawaki Forest Action Belmont</span>
            </div>
            <p className="footer-description">
              Creating native forests for a sustainable future through
              community-driven environmental action.
            </p>
          </div>

          <div className="footer-section">
            <h4>Get Involved</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://aalslasq.donorsupport.co/page/httpsbio4climateorgm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Donate To Support Our Forest
                </a>
              </li>
              <li>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScEmt1Bg0T-mhlZ_dE6TRlVrZ7EQ34nygG8D-ELzAwk5Alkzw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Us As a Volunteer
                </a>
              </li>
              <li>
                <a href="/updates">Latest Updates</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="mailto:miniforestbelmont@gmail.com" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          
            &copy; {new Date().getFullYear()} Miyawaki Forest Action Belmont.
            All rights reserved.
          <br></br>
          Website created by Andrew Ma, and Michelle Oishi with the help of Holly Kong
        </div>
        Jason
      </div>
    </footer>
  );
}

export default Footer;
