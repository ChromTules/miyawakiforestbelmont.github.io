import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapInfoPanel from "../components/InteractiveMap/MapInfoPanel";
import MapSearch from "../components/InteractiveMap/MapSearch";
import LayerFilters from "../components/InteractiveMap/LayerFilters";
import { speciesForTree } from "../data/species";
import "./InteractiveMap.css";

const IMAGE_WIDTH = 1638;
const IMAGE_HEIGHT = 1227;

const normalize = (value) => String(value || "").trim().toUpperCase().replace(/\s+/g, " ");

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

  const searchResults = useMemo(() => {
  const clean = normalize(query);
  const compactQuery = clean.replace(/\s+/g, "");

  if (!clean) return [];

  return trees
    .filter((tree) => {
      const species = speciesForTree(tree);

      const treeId = normalize(tree.tree_id);
      const compactTreeId = treeId.replace(/\s+/g, "");
      const commonName = normalize(species.common);
      const scientificName = normalize(species.scientific);

      return (
        treeId.includes(clean) ||
        compactTreeId.includes(compactQuery) ||
        commonName.includes(clean) ||
        scientificName.includes(clean)
      );
    })
    .slice(0, 10);
}, [query, trees]);

  const layerCount = useMemo(() => {
    if (activeLayer === "all") return trees.length;
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
              onSelect={(tree) => {setQuery(tree.tree_id); selectTree(tree, true); }}
              onClear={() => setQuery("")}
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
                  const matchesLayer = activeLayer === "all" || species.layer === activeLayer;
                  return (
                    <button
                      key={`${tree.tree_id}-${tree.dot_id}-${index}`}
                      type="button"
                      className={`map-tree-marker ${isSelected ? "selected" : ""} ${activeLayer !== "all" ? (matchesLayer ? "layer-highlight" : "layer-dimmed") : ""}`}
                      style={{ left: `${tree.x}px`, top: `${tree.y}px` }}
                      title={`${tree.tree_id} · ${species.common}`}
                      aria-label={`${tree.tree_id}, ${species.common}`}
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={(event) => { event.stopPropagation(); selectTree(tree); }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="map-hint">Scroll to zoom. Drag after zooming in.</div>
          </div>

          <LayerFilters activeLayer={activeLayer} setActiveLayer={setActiveLayer} count={layerCount} />
        </section>
      </div>
    </div>
  );
}
