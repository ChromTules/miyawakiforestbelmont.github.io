import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "Home" },
    {
      label: "The Forest",
      dropdown: [
        { path: "/planting-day", label: "Planting Day" },
        { path: "/interactive-map", label: "Interactive Map" },
        { path: "/gallery", label: "Photos" },
        { path: "/fosters", label: "Fosters" },
      ],
    },
    { path: "/events", label: "Events" },
    {
      label: "Programs",
      dropdown: [
        { path: "/studying-forest", label: "Studying the Forest" },
        { path: "/programs-dedication", label: "Community Dedication" },
        { path: "/programs-perennial-planting", label: "Perennial Planting" },
        { path: "/programs-poetry", label: "Poetry Contest" },
      ],
    },
    {
      label: "Updates",
      dropdown: [{ path: "/updates", label: "News Archive" }],
    },
    { path: "/resources", label: "Resources" },
    { path: "/contact", label: "About Us" },
  ];

  const handleMobileDropdownToggle = (index) => {
    setMobileDropdown(mobileDropdown === index ? null : index);
  };

  const searchableContent = [
    { title: "Miyawaki Forest Info", content: "What is a Miyawaki Forest? Ultra dense biodiverse pocket forest native species biodiversity pollinators ecosystems carbon sequester air pollution water absorption flooding erosion urban heat island", section: "Forest Information", url: "/#info" },
    { title: "Forest Benefits", content: "Rapid Growth 10x faster conventional forests High Density 30x denser vegetation Self-Sustaining No maintenance after 2-3 years Biodiversity Supports native wildlife Carbon Capture CO₂ absorption Community Impact Educational environmental benefits", section: "Benefits", url: "/#info" },
    { title: "Forest Location", content: "Belmont High School front lawn 221 Concord Ave Belmont MA 02478 mini-forest mantle perennials native plant gardens", section: "Location", url: "/#location" },
    { title: "Community Planting Day", content: "Community planting event volunteers training planting techniques October 2025", section: "Events", url: "/planting-day" },
    { title: "Community Dedication", content: "Belmont High School Mini-Forest Community Dedication birthday party tours arts crafts science stories games October 3 2026", section: "Programs", url: "/programs-dedication" },
    { title: "Perennial Planting", content: "Native Plant Perennial Collar Planting forest edge native plants pollinators September 18 September 19 2026", section: "Programs", url: "/programs-perennial-planting" },
    { title: "Project Updates", content: "Website Launch July 2025 Site Selection June 2025 3000 sq ft location Volunteer Training August 2025 Community Planting October 2025", section: "Timeline", url: "/updates" },
    { title: "Our Team", content: "Project leadership Miyawaki Forest Action Belmont", section: "About Us", url: "/contact/#about" },
    { title: "Donate & Volunteer", content: "Donate Support Forest Volunteer training contribute mission native forest ecosystem", section: "Get Involved", url: "/" },
    { title: "Gallery", content: "Photos images forest community planting events progress pictures", section: "Gallery", url: "/gallery" },
    { title: "Contact Information", content: "Contact email Mini-Forest Belmont communication questions support", section: "Contact", url: "/contact" },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().length > 2) {
      const results = searchableContent.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) || item.content.toLowerCase().includes(query.toLowerCase()) || item.section.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchIconClick = () => setIsSearchExpanded(true);
  const handleSearchBlur = () => {
    if (searchQuery.trim() === "") setIsSearchExpanded(false);
    setTimeout(() => setShowSearchResults(false), 200);
  };

  const handleSearchResultClick = (url) => {
    setSearchQuery("");
    setShowSearchResults(false);
    if (url.startsWith("/#")) {
      const anchor = url.substring(2);
      if (location.pathname === "/") {
        setTimeout(() => {
          const tabButton = document.getElementById(anchor);
          if (tabButton) {
            tabButton.click();
            setTimeout(() => tabButton.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
          }
        }, 100);
      } else {
        navigate("/");
        setTimeout(() => {
          const tabButton = document.getElementById(anchor);
          if (tabButton) {
            tabButton.click();
            setTimeout(() => tabButton.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
          }
        }, 500);
      }
    } else navigate(url);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <Link to="/" className="logo">
              <img src="/logo.png" alt="Miyawaki Forest Action Belmont Logo" className="logo-image" />
              <span className="logo-text">Miyawaki Forest Action Belmont</span>
            </Link>
            <div className="nav-right">
              <div className={`nav-menu ${isMenuOpen ? "nav-menu-open" : ""}`}>
                {navItems.map((item, index) => (
                  <div key={index} className="nav-item" onMouseEnter={() => item.dropdown && setActiveDropdown(index)} onMouseLeave={() => item.dropdown && setActiveDropdown(null)}>
                    {item.path ? (
                      <Link to={item.path} className={`nav-link ${location.pathname === item.path ? "nav-link-active" : ""}`} onClick={() => { setIsMenuOpen(false); setMobileDropdown(null); }}>
                        {item.label}
                      </Link>
                    ) : (
                      <span className="nav-link nav-link-dropdown" onClick={() => handleMobileDropdownToggle(index)}>{item.label}</span>
                    )}
                    {item.dropdown && (activeDropdown === index || mobileDropdown === index) && (
                      <div className="dropdown-menu">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link key={subIndex} to={subItem.path} className={`dropdown-item ${location.pathname === subItem.path ? "dropdown-item-active" : ""}`} onClick={() => { setIsMenuOpen(false); setActiveDropdown(null); setMobileDropdown(null); }}>
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
