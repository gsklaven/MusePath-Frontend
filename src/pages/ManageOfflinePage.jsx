/**
 * Offline content management page for downloading/deleting maps and exhibits.
 * Displays storage usage and allows downloading maps/exhibits for offline use.
 */
import React, { useState, useEffect } from 'react';
import { downloadExhibit } from '../api/exhibits';
import { downloadMap } from '../api/maps';
import './ManageOfflinePage.css';

const ManageOfflinePage = () => {
  const [offlineMaps, setOfflineMaps] = useState([]);
  const [offlineExhibits, setOfflineExhibits] = useState([]);
  const [totalStorage, setTotalStorage] = useState(0);
  const [expandMaps, setExpandMaps] = useState(false);
  const [expandExhibits, setExpandExhibits] = useState(false);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    loadOfflineContent();
  }, []);

  const loadOfflineContent = () => {
    try {
      const maps = JSON.parse(localStorage.getItem('offlineMaps') || '[]');
      const exhibits = JSON.parse(localStorage.getItem('offlineExhibits') || '[]');
      setOfflineMaps(maps);
      setOfflineExhibits(exhibits);
      
      // Calculate approximate storage
      const storage = (maps.length * 20) + (exhibits.length * 5); // Rough estimate: 20MB per map, 5MB per exhibit
      setTotalStorage(storage);
    } catch (err) {
      console.error('Error loading offline content:', err);
    }
  };

  const handleDownloadMap = async (mapId) => {
    try {
      setDownloading(`map-${mapId}`);
      console.log('📥 Downloading map:', mapId);
      
      await downloadMap(mapId);
      
      // Store in localStorage
      const maps = JSON.parse(localStorage.getItem('offlineMaps') || '[]');
      if (!maps.some(m => m.map_id === mapId)) {
        maps.push({ map_id: mapId, downloaded_at: new Date().toISOString() });
        localStorage.setItem('offlineMaps', JSON.stringify(maps));
        setOfflineMaps(maps);
      }
      
      setDownloading(null);
      alert(`Map ${mapId} downloaded successfully!`);
    } catch (err) {
      console.error('Error downloading map:', err);
      setDownloading(null);
      alert('Failed to download map');
    }
  };

  const handleDownloadExhibit = async (exhibitId) => {
    try {
      setDownloading(`exhibit-${exhibitId}`);
      console.log('📥 Downloading exhibit:', exhibitId);
      
      await downloadExhibit(exhibitId);
      
      // Store in localStorage
      const exhibits = JSON.parse(localStorage.getItem('offlineExhibits') || '[]');
      if (!exhibits.some(e => e.exhibit_id === exhibitId)) {
        exhibits.push({ exhibit_id: exhibitId, title: `Exhibit ${exhibitId}`, downloaded_at: new Date().toISOString() });
        localStorage.setItem('offlineExhibits', JSON.stringify(exhibits));
        setOfflineExhibits(exhibits);
      }
      
      setDownloading(null);
      alert(`Exhibit ${exhibitId} downloaded successfully!`);
    } catch (err) {
      console.error('Error downloading exhibit:', err);
      setDownloading(null);
      alert('Failed to download exhibit');
    }
  };

  const handleDeleteMap = (mapId) => {
    const maps = offlineMaps.filter(m => m.map_id !== mapId);
    localStorage.setItem('offlineMaps', JSON.stringify(maps));
    setOfflineMaps(maps);
  };

  const handleDeleteExhibit = (exhibitId) => {
    const exhibits = offlineExhibits.filter(e => e.exhibit_id !== exhibitId);
    localStorage.setItem('offlineExhibits', JSON.stringify(exhibits));
    setOfflineExhibits(exhibits);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 48 }}>
        <img src={process.env.PUBLIC_URL + '/assets/icons/no-wifi.png'} alt="Storage" style={{ width: 64, height: 64, marginBottom: 24 }} />
        <h2 style={{ fontWeight: 700, fontSize: 22, color: '#111', marginBottom: 16, textAlign: 'center' }}>Manage Offline Content</h2>
        <div style={{ fontSize: 17, color: '#222', marginBottom: 36, textAlign: 'center' }}>
          View and manage your downloaded content.
        </div>

        {/* Download Section */}
        <div style={{ width: '100%', maxWidth: 420, background: '#e3ecd6', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 20, margin: '0 auto 24px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Download New Content</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => handleDownloadMap(1)}
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
              onClick={() => handleDownloadExhibit(1)}
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

        <div style={{ width: '100%', maxWidth: 420, background: '#f7f7f7', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 0, margin: '0 auto' }}>
          {/* Storage Section */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid #e3ecd6' }}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/storage.png'} alt="Storage" style={{ width: 32, height: 32, marginRight: 18 }} />
            <span style={{ fontSize: 17, color: '#222', flex: 1 }}>Total Storage Used</span>
            <span style={{ fontWeight: 600, color: '#7fa650', fontSize: 16 }}>~{totalStorage}MB</span>
          </div>
          {/* Maps Section */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid #e3ecd6', cursor: 'pointer' }} onClick={() => setExpandMaps(e => !e)}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/maps.png'} alt="Maps" style={{ width: 32, height: 32, marginRight: 18 }} />
            <span style={{ fontSize: 17, color: '#222', flex: 1 }}>Maps Downloaded ({offlineMaps.length})</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/down-chevron.png'} alt="Expand" style={{ width: 22, height: 22, transition: 'transform 0.2s', transform: expandMaps ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </div>
          {expandMaps && (
            <div style={{ padding: '12px 32px 12px 70px', color: '#555', fontSize: 15 }}>
              {offlineMaps.length === 0 ? (
                <div style={{ fontStyle: 'italic', color: '#aaa' }}>No maps downloaded yet.</div>
              ) : (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {offlineMaps.map((map) => (
                    <li key={map.map_id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, padding: '8px 0', borderBottom: '1px solid #eee'}}>
                      <span>Map ID: {map.map_id}</span>
                      <button
                        style={{background: '#ff6b6b', color: '#fff', border: 'none', cursor: 'pointer', padding: '4px 12px', borderRadius: 8, fontWeight: 600}}
                        onClick={() => handleDeleteMap(map.map_id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {/* Exhibits Section */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', cursor: 'pointer' }} onClick={() => setExpandExhibits(e => !e)}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/museum.png'} alt="Exhibits" style={{ width: 32, height: 32, marginRight: 18 }} />
            <span style={{ fontSize: 17, color: '#222', flex: 1 }}>Exhibits Downloaded ({offlineExhibits.length})</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/down-chevron.png'} alt="Expand" style={{ width: 22, height: 22, transition: 'transform 0.2s', transform: expandExhibits ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </div>
          {expandExhibits && (
            <div style={{ padding: '12px 32px 12px 70px', color: '#555', fontSize: 15 }}>
              {offlineExhibits.length === 0 ? (
                <div style={{ fontStyle: 'italic', color: '#aaa' }}>No exhibits downloaded yet.</div>
              ) : (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {offlineExhibits.map((ex) => (
                    <li key={ex.exhibit_id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, padding: '8px 0', borderBottom: '1px solid #eee'}}>
                      <span>{ex.title}</span>
                      <button
                        style={{background: '#ff6b6b', color: '#fff', border: 'none', cursor: 'pointer', padding: '4px 12px', borderRadius: 8, fontWeight: 600}}
                        onClick={() => handleDeleteExhibit(ex.exhibit_id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOfflinePage;