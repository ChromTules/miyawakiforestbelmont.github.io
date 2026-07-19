import {
  speciesCodeFromTree,
  speciesForTree,
} from "../../data/species";

function WelcomePanel() {
  return (
    <div className="map-welcome-card">
      <p className="map-eyebrow">Interactive Tree Map</p>
      <h1>Belmont High School Mini Forest</h1>
      <p className="map-lede">
        Explore the Mini Forest by clicking a marker or searching for a tree ID above.
        The information panel shows the plant image, common name, scientific name,
        forest layer, and phenology-focused facts.
      </p>
      <div className="map-instruction-grid">
        <div><strong>Scroll</strong><span>Zoom in and out</span></div>
        <div><strong>Drag</strong><span>Move after zooming in</span></div>
        <div><strong>Click</strong><span>Learn about a plant</span></div>
        <div><strong>Filter</strong><span>Highlight plant layers</span></div>
      </div>
    </div>
  );
}

export default function MapInfoPanel({ tree }) {
  if (!tree) return <WelcomePanel />;

  const species = speciesForTree(tree);
  const code = speciesCodeFromTree(tree);
  
  return (
    <div className="map-tree-card map-species-profile-card">
      <p className="map-eyebrow">
  Selected Tree · {tree.tree_id || tree.label}
</p>

      {species.image ? (
        <img
          className="map-species-photo"
          src={`/assets/species/${species.image}`}
          alt={species.common}
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        />
      ) : (
        <div className="map-future-box">No species image available yet.</div>
      )}

      <div className="map-layer-pill">{species.layer} · {code}</div>
      <h1 className="map-species-name">{species.common}</h1>
      <p className="map-scientific-name">{species.scientific}</p>

      <ProfileSection title="Description">{species.description}</ProfileSection>
      <ProfileSection title="Habitat">{species.habitat}</ProfileSection>
      <ProfileSection title="Seasonal Timing">{species.seasonal}</ProfileSection>

      <div className="map-profile-section">
        <h2>What to Watch For</h2>
        <ul className="map-watch-list">
          {species.watch.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>

      <ProfileSection title="Wildlife / Ecological Value">{species.value}</ProfileSection>
      <div className="map-profile-section map-fact-section">
        <h2>Interesting Fact</h2>
        <p>{species.fact}</p>
      </div>

      <div className="map-source-box">
        Phenology reference: New York Phenology Project and Nature’s Notebook species resources.
      </div>
    </div>
  );
}

function ProfileSection({ title, children }) {
  return (
    <div className="map-profile-section">
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}
