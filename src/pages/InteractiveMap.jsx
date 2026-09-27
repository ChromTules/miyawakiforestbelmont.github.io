import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapInfoPanel from "../components/InteractiveMap/MapInfoPanel";
import MapSearch from "../components/InteractiveMap/MapSearch";
import LayerFilters from "../components/InteractiveMap/LayerFilters";
import { speciesForTree } from "../data/species";
import "./InteractiveMap.css";

const IMAGE_WIDTH = 1638;
const IMAGE_HEIGHT = 1227;

// Marker calibration for the updated aerial photo.
// Adjust these four values if the overlay needs further fine-tuning.
const MARKER_SCALE_X = 0.98;
const MARKER_SCALE_Y = 0.99;
const MARKER_OFFSET_X = -14;
const MARKER_OFFSET_Y = -5;

const normalize = (value) => String(value || "").trim().toUpperCase().replace(/\s+/g, " ");

const treeNumber = (tree) =>
  String(tree.tree_id || tree.label || "").trim().replace(/^[A-Za-z]+\s*/, "");

// Foster and phenology IDs from the workbook tab:
// "Tree IDs for Fosters & Phenolog".
const FOSTER_TREE_NUMBERS = new Set([
  1094, 1096, 1097, 1098, 1099, 1101, 1102, 1103, 1104, 1105, 1106, 1107,
  1108, 1109, 1110, 1111, 1112, 1145, 106, 112, 81, 792, 793, 794, 795, 797,
  799, 800, 801, 803, 804, 958, 959, 960, 961, 962, 963, 964, 965, 967, 306,
  339, 1046, 1048, 1049, 1051, 1052, 1054, 952, 953, 954, 955, 956, 957,
  780, 785, 753, 754, 755, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093,
  1142, 1125, 1127, 1128, 1129, 1144, 1140, 451, 491, 496, 500, 501, 502,
  1033, 1036, 1037,
]);

// East Trail uses the current replacement trees 7 and 1025 in place of 67 and 1022.
const PHENOLOGY_ROUTES = {
  east: new Set([1098, 7, 792, 831, 1047, 878, 358, 756, 727, 1025]),
  north: new Set([1112, 20, 806, 850, 1049, 911, 345, 753, 639, 1011]),
  west: new Set([1105, 102, 793, 819, 1048, 905, 399, 769, 690, 1013]),
};

const numberForTree = (tree) => Number(treeNumber(tree));

const phenologyRouteForTree = (tree) => {
  const number = numberForTree(tree);
  if (PHENOLOGY_ROUTES.east.has(number)) return "east";
  if (PHENOLOGY_ROUTES.north.has(number)) return "north";
  if (PHENOLOGY_ROUTES.west.has(number)) return "west";
  return null;
};

export default function InteractiveMap() {
  const [trees, setTrees] = useState([]);
  const [selectedTree, setSelectedTree] = useState(null);
  const [activeLayer, setActiveLayer] = useState("all");
  const [query, setQuery] = useState("");
  const [loadError, setLoadError] = useState("");
  const [view, setView] = useState({ scale: 1, minScale: 1, maxScale: 5, x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const viewportRef = useRef(null);
  const dragRef = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    let cancelled = false;
    fetch("/data/trees.json")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setTrees(data);
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) setLoadError("The map data could not be loaded. Check that public/data/trees.json exists.");
      });
    return () => { cancelled = true; };
  }, []);

  const clampPosition = useCallback((candidate) => {
    const viewport = viewportRef.current;
    if (!viewport) return candidate;
    const rect = viewport.getBoundingClientRect();
    const scaledWidth = IMAGE_WIDTH * candidate.scale;
    const scaledHeight = IMAGE_HEIGHT * candidate.scale;
    return {
      ...candidate,
      x: scaledWidth <= rect.width
        ? (rect.width - scaledWidth) / 2
        : Math.min(0, Math.max(rect.width - scaledWidth, candidate.x)),
      y: scaledHeight <= rect.height
        ? (rect.height - scaledHeight) / 2
        : Math.min(0, Math.max(rect.height - scaledHeight, candidate.y)),
    };
  }, []);

  const resetView = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const minScale = Math.min(rect.width / IMAGE_WIDTH, rect.height / IMAGE_HEIGHT);
    const next = {
      scale: minScale,
      minScale,
      maxScale: minScale * 5,
      x: (rect.width - IMAGE_WIDTH * minScale) / 2,
      y: (rect.height - IMAGE_HEIGHT * minScale) / 2,
    };
    setView(clampPosition(next));
  }, [clampPosition]);

  useEffect(() => {
    resetView();
    window.addEventListener("resize", resetView);
    return () => window.removeEventListener("resize", resetView);
  }, [resetView]);

  const zoomAt = useCallback((clientX, clientY, factor) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    setView((current) => {
      const pointX = clientX - rect.left;
      const pointY = clientY - rect.top;
      const nextScale = Math.min(Math.max(current.scale * factor, current.minScale), current.maxScale);
      if (Math.abs(nextScale - current.scale) < 0.0001) return current;
      const mapX = (pointX - current.x) / current.scale;
      const mapY = (pointY - current.y) / current.scale;
      return clampPosition({
        ...current,
        scale: nextScale,
        x: pointX - mapX * nextScale,
        y: pointY - mapY * nextScale,
      });
    });
  }, [clampPosition]);

    useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();

      zoomAt(
        event.clientX,
        event.clientY,
        event.deltaY < 0 ? 1.06 : 0.94
      );
    };

    viewport.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      viewport.removeEventListener("wheel", handleWheel);
    };
  }, [zoomAt]);

  const centerOn = useCallback((tree) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    setView((current) => {
      const scale = Math.min(Math.max(current.scale, current.minScale * 2.2), current.maxScale);
      return clampPosition({
        ...current,
        scale,
        x: rect.width / 2 - tree.x * scale,
        y: rect.height / 2 - tree.y * scale,
      });
    });
  }, [clampPosition]);

  const selectTree = useCallback((tree, shouldCenter = false) => {
    setSelectedTree(tree);
    if (shouldCenter) centerOn(tree);
  }, [centerOn]);

  const searchMatch = useMemo(() => {
    const clean = normalize(query);
    const compactQuery = clean.replace(/\s+/g, "");

    if (!clean) return { type: null, trees: [] };

    // Exact tree-number search: highlight only that individual tree.
    const exactTree = trees.find((tree) => {
      const fullId = normalize(tree.tree_id);
      const numberOnly = normalize(treeNumber(tree));
      return fullId === clean || numberOnly === clean || fullId.replace(/\s+/g, "") === compactQuery;
    });

    if (exactTree) return { type: "tree", trees: [exactTree] };

    // Exact common/scientific species search: highlight every tree of that species.
    const exactSpeciesTrees = trees.filter((tree) => {
      const species = speciesForTree(tree);
      return normalize(species.common) === clean || normalize(species.scientific) === clean;
    });

    if (exactSpeciesTrees.length) return { type: "species", trees: exactSpeciesTrees };

    return { type: null, trees: [] };
  }, [query, trees]);

  const searchResults = useMemo(() => {
    const clean = normalize(query);
    const compactQuery = clean.replace(/\s+/g, "");

    if (!clean) return [];

    // Build suggestions, collapsing species matches so a species appears once.
    const suggestions = [];
    const seenSpecies = new Set();

    for (const tree of trees) {
      const species = speciesForTree(tree);
      const fullId = normalize(tree.tree_id);
      const numberOnly = normalize(treeNumber(tree));
      const commonName = normalize(species.common);
      const scientificName = normalize(species.scientific);

      const idMatch =
        fullId.includes(clean) ||
        numberOnly.includes(clean) ||
        fullId.replace(/\s+/g, "").includes(compactQuery);

      const speciesMatch =
        commonName.includes(clean) ||
        scientificName.includes(clean);

      if (idMatch) {
        suggestions.push({ kind: "tree", tree, label: `${treeNumber(tree)} · ${species.common}` });
      } else if (speciesMatch) {
        const speciesKey = `${commonName}|${scientificName}`;
        if (!seenSpecies.has(speciesKey)) {
          seenSpecies.add(speciesKey);
          suggestions.push({ kind: "species", tree, label: `${species.common} · ${species.scientific}` });
        }
      }

      if (suggestions.length >= 10) break;
    }

    return suggestions;
  }, [query, trees]);

  const handleSearchSelect = useCallback((result) => {
    const species = speciesForTree(result.tree);

    if (result.kind === "tree") {
      setQuery(treeNumber(result.tree));
      selectTree(result.tree, true);
    } else {
      setQuery(species.common);
      setSelectedTree(null);
      resetView();
    }
  }, [selectTree, resetView]);

  const layerCount = useMemo(() => {
    if (activeLayer === "all") return trees.length;
    if (activeLayer === "fostered") {
      return trees.filter((tree) => FOSTER_TREE_NUMBERS.has(numberForTree(tree))).length;
    }
    if (activeLayer === "phenology") {
      return trees.filter((tree) => phenologyRouteForTree(tree)).length;
    }
    return trees.filter((tree) => speciesForTree(tree).layer === activeLayer).length;
  }, [activeLayer, trees]);

  const handlePointerDown = (event) => {
    if (event.target.closest(".map-tree-marker")) return;
    if (view.scale <= view.minScale + 0.001) return;
    dragRef.current = { startX: event.clientX, startY: event.clientY, lastX: view.x, lastY: view.y };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragging) return;
    setView((current) => clampPosition({
      ...current,
      x: dragRef.current.lastX + event.clientX - dragRef.current.startX,
      y: dragRef.current.lastY + event.clientY - dragRef.current.startY,
    }));
  };

  const stopDragging = (event) => {
    setDragging(false);
    try { event.currentTarget.releasePointerCapture(event.pointerId); } catch (_) { /* no-op */ }
  };

  return (
    <div className="interactive-map-page">
      <div className="map-app-shell">
        <aside className="map-sidebar">
          
          {/*}
          <div className="map-brand-block">
            <div className="map-logo-mark" aria-hidden="true">🌳</div>
            <div>
              <p className="map-mini-title">Miyawaki Forest</p>
              <p className="map-mini-title">Action Belmont</p>
              <span className="map-visually-hidden">{trees.length} mapped trees</span>
            </div>
          </div>
          */}

          <div className="map-info-panel">
            {loadError ? <p className="map-load-error">{loadError}</p> : <MapInfoPanel tree={selectedTree} />}
          </div>
        </aside>

        <section className="map-workspace">
          <header className="map-topbar">
            <MapSearch
              query={query}
              setQuery={setQuery}
              results={searchResults}
              onSelect={handleSearchSelect}
            />
            <div className="map-tool-buttons" aria-label="Map controls">
              <button type="button" onClick={() => {
                const rect = viewportRef.current.getBoundingClientRect();
                zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 0.84);
              }}>−</button>
              <button type="button" onClick={resetView}>Reset</button>
              <button type="button" onClick={() => {
                const rect = viewportRef.current.getBoundingClientRect();
                zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 1.18);
              }}>+</button>
            </div>
          </header>

          <div
            ref={viewportRef}
            className={`map-viewport ${view.scale > view.minScale + 0.001 ? "zoomed" : ""} ${dragging ? "dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
           

            
          >
            <div
              className="map-surface"
              style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
            >
              <img
                className="map-image"
                src="/assets/mini_forest_map.png"
                alt="Aerial view of the Belmont High School Mini Forest"
                draggable="false"
              />
              <div className="map-marker-layer">
                {trees.map((tree, index) => {
                  const species = speciesForTree(tree);
                  const isSelected = selectedTree === tree;
                  const treeNum = numberForTree(tree);
                  const phenologyRoute = phenologyRouteForTree(tree);
                  const isFostered = FOSTER_TREE_NUMBERS.has(treeNum);

                  const matchesLayer =
                    activeLayer === "all" ||
                    (activeLayer === "fostered" && isFostered) ||
                    (activeLayer === "phenology" && Boolean(phenologyRoute)) ||
                    species.layer === activeLayer;

                  const matchesSearch = searchMatch.trees.includes(tree);
                  const searchActive = searchMatch.trees.length > 0;

                  const specialClass =
                    activeLayer === "fostered" && isFostered
                      ? "foster-highlight"
                      : activeLayer === "phenology" && phenologyRoute
                        ? `phenology-${phenologyRoute}`
                        : "";

                  return (
                    <button
                      key={`${tree.tree_id}-${tree.dot_id}-${index}`}
                      type="button"
                      className={`map-tree-marker ${isSelected ? "selected" : ""} ${searchActive ? (matchesSearch ? "search-highlight" : "search-dimmed") : ""} ${activeLayer !== "all" ? (matchesLayer ? "layer-highlight" : "layer-dimmed") : ""} ${specialClass}`}
                      style={{
                        left: `${IMAGE_WIDTH / 2 + (tree.x - IMAGE_WIDTH / 2) * MARKER_SCALE_X + MARKER_OFFSET_X}px`,
                        top: `${IMAGE_HEIGHT / 2 + (tree.y - IMAGE_HEIGHT / 2) * MARKER_SCALE_Y + MARKER_OFFSET_Y}px`,
                      }}
                      title={`${treeNumber(tree)} · ${species.common}`}
                      aria-label={`${treeNumber(tree)}, ${species.common}`}
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={(event) => { event.stopPropagation(); selectTree(tree); }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="map-compass" aria-label="North">
              <span className="map-compass-n">N</span>
              <span className="map-compass-arrow" aria-hidden="true">↑</span>
            </div>

            {activeLayer === "phenology" && (
              <div
                className="map-phenology-map-key"
                aria-label="Phenology trail colors"
              >
                <div className="map-phenology-map-key-title">Phenology Trails</div>
                <div className="map-phenology-map-key-item">
                  <span className="trail-dot trail-east" />
                  <span>East Trail</span>
                </div>
                <div className="map-phenology-map-key-item">
                  <span className="trail-dot trail-north" />
                  <span>North Trail</span>
                </div>
                <div className="map-phenology-map-key-item">
                  <span className="trail-dot trail-west" />
                  <span>West Trail</span>
                </div>
              </div>
            )}

            <div className="map-hint">Scroll to zoom. Drag after zooming in.</div>
          </div>

          <LayerFilters activeLayer={activeLayer} setActiveLayer={setActiveLayer} trees={trees} />
        </section>
      </div>
    </div>
  );
}
