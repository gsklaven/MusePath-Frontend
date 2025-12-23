import React from 'react';

/**
 * MapSearchOverlay Component
 * Renders the search bar and search results overlay on the map.
 */
const MapSearchOverlay = ({ 
  searchTerm, 
  onSearchChange, 
  onSearchSubmit, 
  searchResults, 
  showResults, 
  onResultClick 
}) => {
  return (
    <div
      className="search-bar-mockup"
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 24,
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: 420,
        zIndex: 10,
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <form onSubmit={onSearchSubmit}>
        <div className="search-bar-mockup-input" style={{ display: 'flex', alignItems: 'center', background: '#e3ecd6', borderRadius: 16, padding: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontFamily: 'Montserrat, sans-serif' }}>
          <img
            src={process.env.PUBLIC_URL + '/assets/icons/menu.png'}
            alt="Menu"
            style={{ marginLeft: 12, marginRight: 8, width: 24, height: 24, cursor: 'pointer' }}
          />
          <input
            type="text"
            placeholder="Search Exhibit"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '1.1rem',
              color: '#222',
              width: '100%',
              fontFamily: 'Montserrat, sans-serif',
            }}
          />
          <button type="submit" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <img
              src={process.env.PUBLIC_URL + '/assets/icons/search.png'}
              alt="Search"
              style={{ marginLeft: 8, marginRight: 12, width: 22, height: 22, color: '#7f8c8d' }}
            />
          </button>
        </div>
      </form>

      {showResults && (
        <div style={{
          marginTop: 8,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          maxHeight: 300,
          overflowY: 'auto',
          padding: 8,
        }}>
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div
                key={result.exhibitId || result.exhibit_id}
                onClick={() => onResultClick(result)}
                style={{ padding: '12px 16px', borderBottom: '1px solid #eee', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontWeight: 600, color: '#222' }}>{result.title}</div>
                {result.subtitle && <div style={{ fontSize: '0.9rem', color: '#666', marginTop: 4 }}>{result.subtitle}</div>}
              </div>
            ))
          ) : (
            <div style={{ padding: '16px', textAlign: 'center', color: '#999' }}>No exhibits found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapSearchOverlay;