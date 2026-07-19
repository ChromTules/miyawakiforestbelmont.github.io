import { speciesForTree } from "../../data/species";

export default function MapSearch({
  query,
  setQuery,
  results,
  onSelect,
  onClear,
}) {
  return (
    <div className="map-search-wrap">
      <span className="map-search-icon" aria-hidden="true">
        ⌕
      </span>

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search tree ID, species, or scientific name"
        autoComplete="off"
      />

      <button type="button" onClick={onClear}>
        Clear
      </button>

      {query.trim() && (
        <div className="map-result-list">
          {results.length > 0 ? (
            results.map((tree, index) => {
              const species = speciesForTree(tree);

              return (
                <button
                  key={`${tree.tree_id}-${tree.dot_id || index}`}
                  type="button"
                  className="map-result-item"
                  onClick={() => onSelect(tree)}
                >
                  {tree.tree_id} · {species.common}
                </button>
              );
            })
          ) : (
            <div className="map-no-results">
              No matching tree found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}