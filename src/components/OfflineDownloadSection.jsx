import React from 'react';

/**
 * OfflineDownloadSection Component
 * Provides buttons to trigger downloads for maps and exhibits.
 *
 * @param {Object} props
 * @param {string|null} props.downloading - ID of item currently downloading, or null.
 * @param {function} props.onDownloadMap - Handler to download a map.
 * @param {function} props.onDownloadExhibit - Handler to download an exhibit.
 */
const OfflineDownloadSection = ({ downloading, onDownloadMap, onDownloadExhibit }) => {
  return (
    <div style={{ width: '100%', maxWidth: 420, background: '#e3ecd6', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 20, margin: '0 auto 24px' }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Download New Content</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {/* Map download button with loading state */}
        <button
          onClick={() => onDownloadMap(1)}
          disabled={downloading === 'map-1'}
          style={{
            background: '#BBD689',
            color: '#222',
            border: 'none',
            borderRadius: 12,
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 600,
            opacity: downloading === 'map-1' ? 0.5 : 1,
          }}
        >
          {downloading === 'map-1' ? 'Downloading...' : 'Download Map 1'}
        </button>
        <button
          onClick={() => onDownloadExhibit(1)}
          disabled={downloading === 'exhibit-1'}
          style={{
            background: '#BBD689',
            color: '#222',
            border: 'none',
            borderRadius: 12,
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 600,
            opacity: downloading === 'exhibit-1' ? 0.5 : 1,
          }}
        >
          {downloading === 'exhibit-1' ? 'Downloading...' : 'Download Exhibit 1'}
        </button>
      </div>
    </div>
  );
};

export default OfflineDownloadSection;