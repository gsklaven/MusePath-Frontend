
import React, { useState } from 'react';
import './ManageOfflinePage.css';

const ManageOfflinePage = () => {
  const [offlineMaps, setOfflineMaps] = useState([{ map_id: 1 }, { map_id: 2 }]);
  const [offlineExhibits, setOfflineExhibits] = useState([{ category: 'Art' }, { category: 'History' }]);
  const [totalStorage, setTotalStorage] = useState(60);
  const [expandMaps, setExpandMaps] = useState(false);
  const [expandExhibits, setExpandExhibits] = useState(false);

  // Delete handlers
  const handleDeleteMap = (idx) => {
    setOfflineMaps(maps => maps.filter((_, i) => i !== idx));
  };
  const handleDeleteExhibit = (idx) => {
    setOfflineExhibits(exs => exs.filter((_, i) => i !== idx));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 48 }}>
        <img src={process.env.PUBLIC_URL + '/assets/icons/no-wifi.png'} alt="Storage" style={{ width: 64, height: 64, marginBottom: 24 }} />
        <h2 style={{ fontWeight: 700, fontSize: 22, color: '#111', marginBottom: 16, textAlign: 'center' }}>Manage Offline Content</h2>
        <div style={{ fontSize: 17, color: '#222', marginBottom: 36, textAlign: 'center' }}>
          View and manage your downloaded content.
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
            <span style={{ fontSize: 17, color: '#222', flex: 1 }}>Maps Downloaded</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/down-chevron.png'} alt="Expand" style={{ width: 22, height: 22, transition: 'transform 0.2s', transform: expandMaps ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </div>
          {expandMaps && (
            <div style={{ padding: '0 32px 12px 70px', color: '#555', fontSize: 15 }}>
              {offlineMaps.length === 0 ? (
                <div style={{ fontStyle: 'italic', color: '#aaa' }}>No maps downloaded yet.</div>
              ) : (
                <ul style={{ margin: 0, padding: 0, listStyle: 'disc inside', marginTop: 16 }}>
                  {offlineMaps.map((map, idx) => (
                    <li key={idx} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6}}>
                      <span>Map ID: {map.map_id}</span>
                      <button
                        style={{background: 'none', border: 'none', cursor: 'pointer', marginLeft: 12, padding: 0}}
                        title="Delete map"
                        onClick={() => handleDeleteMap(idx)}
                      >
                        <img src={process.env.PUBLIC_URL + '/assets/icons/bin.png'} alt="Delete" style={{width: 20, height: 20, opacity: 0.7}} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {/* Exhibit Categories Section */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', cursor: 'pointer' }} onClick={() => setExpandExhibits(e => !e)}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/museum.png'} alt="Exhibits" style={{ width: 32, height: 32, marginRight: 18 }} />
            <span style={{ fontSize: 17, color: '#222', flex: 1 }}>Exhibit Categories</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/down-chevron.png'} alt="Expand" style={{ width: 22, height: 22, transition: 'transform 0.2s', transform: expandExhibits ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </div>
          {expandExhibits && (
            <div style={{ padding: '0 32px 12px 70px', color: '#555', fontSize: 15 }}>
              {offlineExhibits.length === 0 ? (
                <div style={{ fontStyle: 'italic', color: '#aaa' }}>No exhibit categories downloaded yet.</div>
              ) : (
                <ul style={{ margin: 0, padding: 0, listStyle: 'disc inside' }}>
                  {offlineExhibits.map((ex, idx) => (
                    <li key={idx} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6}}>
                      <span>{ex.category}</span>
                      <button
                        style={{background: 'none', border: 'none', cursor: 'pointer', marginLeft: 12, padding: 0}}
                        title="Delete category"
                        onClick={() => handleDeleteExhibit(idx)}
                      >
                        <img src={process.env.PUBLIC_URL + '/assets/icons/bin.png'} alt="Delete" style={{width: 20, height: 20, opacity: 0.7}} />
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