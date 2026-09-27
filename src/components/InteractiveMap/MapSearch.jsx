export default function MapSearch({
  query,
  setQuery,
  results,
  onSelect,
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
        placeholder="Search tree number, species, or scientific name"
        autoComplete="off"
      />

      {query.trim() && results.length > 0 && (
        <div className="map-result-list">
          {results.map((result, index) => (
            <button
              key={`${result.kind}-${result.tree.tree_id}-${index}`}
              type="button"
              className="map-result-item"
              onClick={() => onSelect(result)}
            >
              {result.label}
            </button>
          ))}
        </div>
      )}

      {query.trim() && results.length === 0 && (
        <div className="map-result-list">
          <div className="map-no-results">No matching tree found.</div>
        </div>
      )}
    </div>
  );
}
