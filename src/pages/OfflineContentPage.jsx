/**
 * OfflineContentPage Component
 * 
 * Displays and provides access to museum content downloaded for offline use.
 * Enables viewing of cached maps and exhibits when internet connectivity is unavailable.
 * 
 * Purpose:
 * - View all previously downloaded maps and exhibits from local storage
 * - Access content in airplane mode or areas with poor connectivity
 * - Browse offline content without consuming mobile data
 * - Quick access to saved museum information during visits
 * 
 * Content Display:
 * - Maps Section: Lists all downloaded museum floor plans with view buttons
 * - Exhibits Section: Lists all downloaded exhibit details with view buttons
 * - Download Counts: Shows number of items in each category
 * - Empty States: Instructional messages when no content is downloaded
 * 
 * Features:
 * - View Offline Maps: Click to display cached map data without API calls
 * - View Offline Exhibits: Click to display cached exhibit information
 * - Persistent Storage: All content loaded from localStorage
 * - No Internet Required: Functions completely offline after initial download
 * - Organized Layout: Clean sections for maps and exhibits with icons
 * 
 * Data Structure:
 * - offlineMaps: Array of {map_id, downloaded_at} objects from localStorage
 * - offlineExhibits: Array of {exhibit_id, title, downloaded_at} objects
 * - Downloaded content managed via ManageOfflinePage
 * 
 * User Actions:
 * - Click "View" button to display offline map using getMapById in offline mode
 * - Click "View" button to display offline exhibit using getExhibitById in offline mode
 * - Navigate to ManageOfflinePage to download more content
 * 
 * Offline Mode API:
 * - getExhibitById(id, 'offline'): Fetches exhibit from cache
 * - getMapById(id, null, null, 'offline'): Fetches map from cache
 * - Both APIs check localStorage before attempting network requests
 * 
 * Integration:
 * - Works with ManageOfflinePage for content downloads
 * - Syncs with offline storage managed by downloadMap/downloadExhibit APIs
 * - Accessible from main navigation when in offline mode
 * 
 * Visual Design:
 * - Icon-based sections with download and map icons
 * - Clean white background with subtle shadows
 * - Montserrat font for consistency with app design
 * - Helpful messaging to guide users to download more content
 */
import React, { useState, useEffect } from 'react';
import { getExhibitById } from '../api/exhibits';
import { getMapById } from '../api/maps';

const OfflineContentPage = () => {
  const [offlineMaps, setOfflineMaps] = useState([]);
  const [offlineExhibits, setOfflineExhibits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOfflineContent();
  }, []);

  const loadOfflineContent = async () => {
    try {
      // Load from localStorage
      const maps = JSON.parse(localStorage.getItem('offlineMaps') || '[]');
      const exhibits = JSON.parse(localStorage.getItem('offlineExhibits') || '[]');
      
      setOfflineMaps(maps);
      setOfflineExhibits(exhibits);
      setLoading(false);
    } catch (err) {
      console.error('Error loading offline content:', err);
      setLoading(false);
    }
  };

  const viewOfflineExhibit = async (exhibitId) => {
    try {
      // Try to fetch with offline mode
      const data = await getExhibitById(exhibitId, 'offline');
      console.log('Offline exhibit data:', data);
      alert(`Viewing exhibit ${exhibitId} in offline mode`);
    } catch (err) {
      console.error('Error viewing offline exhibit:', err);
      alert('Failed to load offline exhibit');
    }
  };

  const viewOfflineMap = async (mapId) => {
    try {
      // Try to fetch with offline mode
      const data = await getMapById(mapId, null, null, 'offline');
      console.log('Offline map data:', data);
      alert(`Viewing map ${mapId} in offline mode`);
    } catch (err) {
      console.error('Error viewing offline map:', err);
      alert('Failed to load offline map');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 48 }}>
        <img src={process.env.PUBLIC_URL + '/assets/icons/download.png'} alt="Download" style={{ width: 64, height: 64, marginBottom: 24 }} />
        <h2 style={{ fontWeight: 700, fontSize: 22, color: '#111', marginBottom: 16, textAlign: 'center' }}>Offline Content</h2>
        <div style={{ fontSize: 17, color: '#222', marginBottom: 36, textAlign: 'center' }}>
          Access your downloaded content without internet connection.
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div style={{ width: '100%', maxWidth: 420, background: '#f7f7f7', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 0, margin: '0 auto' }}>
            {/* Maps Section */}
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #e3ecd6' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <img src={process.env.PUBLIC_URL + '/assets/icons/maps.png'} alt="Maps" style={{ width: 32, height: 32, marginRight: 18 }} />
                <span style={{ fontSize: 17, color: '#222', flex: 1, fontWeight: 600 }}>Downloaded Maps ({offlineMaps.length})</span>
              </div>
              {offlineMaps.length === 0 ? (
                <div style={{ fontSize: 15, color: '#999', fontStyle: 'italic', marginLeft: 50 }}>
                  No maps downloaded. Go to Manage Offline to download.
                </div>
              ) : (
                <div style={{ marginLeft: 50 }}>
                  {offlineMaps.map((map) => (
                    <div
                      key={map.map_id}
                      onClick={() => viewOfflineMap(map.map_id)}
                      style={{
                        padding: '10px',
                        background: '#fff',
                        borderRadius: 8,
                        marginBottom: 8,
                        cursor: 'pointer',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }}
                    >
                      <div style={{ fontWeight: 600, color: '#222' }}>Map {map.map_id}</div>
                      <div style={{ fontSize: 13, color: '#666' }}>
                        Downloaded: {new Date(map.downloaded_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Exhibit Information Section */}
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #e3ecd6' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <img src={process.env.PUBLIC_URL + '/assets/icons/museum.png'} alt="Exhibit Info" style={{ width: 32, height: 32, marginRight: 18 }} />
                <span style={{ fontSize: 17, color: '#222', flex: 1, fontWeight: 600 }}>Downloaded Exhibits ({offlineExhibits.length})</span>
              </div>
              {offlineExhibits.length === 0 ? (
                <div style={{ fontSize: 15, color: '#999', fontStyle: 'italic', marginLeft: 50 }}>
                  No exhibits downloaded. Go to Manage Offline to download.
                </div>
              ) : (
                <div style={{ marginLeft: 50 }}>
                  {offlineExhibits.map((exhibit) => (
                    <div
                      key={exhibit.exhibit_id}
                      onClick={() => viewOfflineExhibit(exhibit.exhibit_id)}
                      style={{
                        padding: '10px',
                        background: '#fff',
                        borderRadius: 8,
                        marginBottom: 8,
                        cursor: 'pointer',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }}
                    >
                      <div style={{ fontWeight: 600, color: '#222' }}>{exhibit.title}</div>
                      <div style={{ fontSize: 13, color: '#666' }}>
                        Downloaded: {new Date(exhibit.downloaded_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Routes Section */}
            <div style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={process.env.PUBLIC_URL + '/assets/icons/distance.png'} alt="Routes" style={{ width: 32, height: 32, marginRight: 18 }} />
                <span style={{ fontSize: 17, color: '#222', flex: 1, fontWeight: 600 }}>Saved Routes</span>
              </div>
              <div style={{ fontSize: 15, color: '#999', fontStyle: 'italic', marginLeft: 50, marginTop: 12 }}>
                Routes are cached automatically when you navigate.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineContentPage;
