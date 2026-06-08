import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Fosters from "./pages/Fosters";
import Updates from "./pages/Updates";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Resources from "./pages/Resources";
import ProgramsPoetry from "./pages/ProgramsPoetry";
import PlantingDay from "./pages/PlantingDay";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fosters" element={<Fosters />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/programs-poetry" element={<ProgramsPoetry />} />
            <Route path="/planting-day" element={<PlantingDay />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
