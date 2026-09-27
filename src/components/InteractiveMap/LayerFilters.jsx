import { useMemo, useState } from "react";
import { speciesForTree } from "../../data/species";

const FILTERS = [
  { value: "all", label: "All Plants" },
  { value: "Canopy", label: "Canopy" },
  { value: "Shrub", label: "Shrub" },
  { value: "Understory", label: "Understory" },
  { value: "fostered", label: "Fostered Trees" },
  { value: "phenology", label: "Phenology Project" },
];

const LAYER_COPY = {
  Canopy: {
    eyebrow: "Plant Layer",
    title: "Canopy",
    description:
      "The canopy is the upper layer of the Mini-Forest, formed by its taller trees. These trees create shade and help shape the forest structure below.",
  },
  Shrub: {
    eyebrow: "Plant Layer",
    title: "Shrub",
    description:
      "The shrub layer grows below the canopy and is made up of shorter woody plants. It adds density, habitat, flowers, and fruit closer to the ground.",
  },
  Understory: {
    eyebrow: "Plant Layer",
    title: "Understory",
    description:
      "The understory occupies the lower part of the forest beneath taller trees and shrubs. These plants grow in the filtered light that reaches the forest floor.",
  },
  fostered: {
    eyebrow: "Forest Project",
    title: "Fostered Trees",
    description:
      "These plants have been fostered by members of the community. Selecting this layer highlights the fostered plants throughout the Mini-Forest.",
  },
  phenology: {
    eyebrow: "Forest Project",
    title: "Phenology Project",
    description:
      "These trees are part of the Mini-Forest phenology project, which follows seasonal changes over time along the East, North, and West trails.",
  },
};

export default function LayerFilters({ activeLayer, setActiveLayer, trees }) {
  const [detailLayer, setDetailLayer] = useState(null);

  const speciesInLayer = useMemo(() => {
    if (!["Canopy", "Shrub", "Understory"].includes(detailLayer)) return [];

    const uniqueSpecies = new Map();

    for (const tree of trees || []) {
      const species = speciesForTree(tree);
      if (species.layer !== detailLayer) continue;

      const common = String(species.common || "").trim();
      const scientific = String(species.scientific || "").trim();
      const key = `${common.toLowerCase()}|${scientific.toLowerCase()}`;

      if (!uniqueSpecies.has(key)) {
        uniqueSpecies.set(key, { common, scientific });
      }
    }

    return Array.from(uniqueSpecies.values()).sort((a, b) =>
      a.common.localeCompare(b.common)
    );
  }, [detailLayer, trees]);

  const handleLayerClick = (value) => {
    setActiveLayer(value);

    if (value === "all") {
      setDetailLayer(null);
    } else {
      setDetailLayer(value);
    }
  };

  const handleBack = () => {
    setDetailLayer(null);
  };

  if (detailLayer) {
    const copy = LAYER_COPY[detailLayer];

    return (
      <aside className="map-right-panel">
        <div className="map-filter-card map-layer-detail-card">
          <button
            type="button"
            className="map-layer-back"
            onClick={handleBack}
            aria-label="Back to layer choices"
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </button>

          <div className="map-layer-detail-content">
            <p className="map-eyebrow">{copy.eyebrow}</p>
            <h2>{copy.title}</h2>
            <p className="map-filter-note">{copy.description}</p>

            {speciesInLayer.length > 0 && (
              <div className="map-layer-species">
                <p className="map-layer-species-heading">Species in this layer</p>

                <div className="map-layer-species-list">
                  {speciesInLayer.map((species) => (
                    <div
                      className="map-layer-species-item"
                      key={`${species.common}-${species.scientific}`}
                    >
                      <span className="map-layer-species-common">
                        {species.common}
                      </span>
                      {species.scientific && (
                        <span className="map-layer-species-scientific">
                          {species.scientific}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="map-right-panel">
      <div className="map-filter-card">
        <p className="map-eyebrow">Plant Layers</p>
        <h2>Highlight by layer</h2>
        <p className="map-filter-note">
          Choose a plant layer or project to highlight matching trees on the map.
        </p>

        <div className="map-filter-buttons">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={`map-layer-filter ${
                activeLayer === filter.value ? "active" : ""
              }`}
              onClick={() => handleLayerClick(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
