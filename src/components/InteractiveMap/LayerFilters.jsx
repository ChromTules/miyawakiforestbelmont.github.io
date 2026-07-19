const LAYERS = ["all", "Canopy", "Shrub", "Understory"];

export default function LayerFilters({ activeLayer, setActiveLayer, count }) {
  return (
    <aside className="map-right-panel" aria-label="Plant layer filters">
      <section className="map-filter-card">
        <p className="map-eyebrow">Plant Layers</p>
        <h2>Highlight by layer</h2>
        <p className="map-filter-note">
          Choose a plant layer to highlight matching trees on the map.
        </p>

        <div className="map-filter-buttons" role="group" aria-label="Filter tree markers by plant layer">
          {LAYERS.map((layer) => (
            <button
              key={layer}
              type="button"
              className={`map-layer-filter ${activeLayer === layer ? "active" : ""}`}
              onClick={() => setActiveLayer(layer)}
            >
              {layer === "all" ? "All Plants" : layer}
            </button>
          ))}
        </div>

        <div className="map-filter-summary">
          Interactive Map developed by Jason Zhao
        </div>
      </section>
    </aside>
  );
}
