import React, { useState, useEffect } from 'react';
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '../utils/helpers';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import './ManageOfflinePage.css';

const ManageOfflinePage = () => {
  const [offlineMaps, setOfflineMaps] = useState([]);
  const [offlineExhibits, setOfflineExhibits] = useState([]);
  const [totalStorage, setTotalStorage] = useState(0);

  useEffect(() => {
    loadOfflineContent();
  }, []);

  const loadOfflineContent = () => {
    const maps = getFromLocalStorage('offline_maps') || [];
    const exhibits = getFromLocalStorage('offline_exhibits') || [];
    
    setOfflineMaps(maps);
    setOfflineExhibits(exhibits);
    
    // Calculate approximate storage (mock calculation)
    const storage = maps.length * 5 + exhibits.length * 15;
    setTotalStorage(storage);
  };

  const handleDeleteMap = (mapId) => {
    const updatedMaps = offlineMaps.filter(m => m.map_id !== mapId);
    saveToLocalStorage('offline_maps', updatedMaps);
    setOfflineMaps(updatedMaps);
    alert('Map deleted from offline storage.');
  };

  const handleDeleteExhibit = (category) => {
    const updatedExhibits = offlineExhibits.filter(e => e.category !== category);
    saveToLocalStorage('offline_exhibits', updatedExhibits);
    setOfflineExhibits(updatedExhibits);
    alert('Category deleted from offline storage.');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all offline content?')) {
      removeFromLocalStorage('offline_maps');
      removeFromLocalStorage('offline_exhibits');
      setOfflineMaps([]);
      setOfflineExhibits([]);
      setTotalStorage(0);
      alert('All offline content deleted.');
    }
  };

  return (
    <div>
      <Header />
      <div className="container manage-offline-container">
        <Card>
          <h1>💾 Manage Offline Content</h1>

          <div className="storage-summary">
            <div className="storage-item">
              <span className="label">Total Storage Used:</span>
              <span className="value">~{totalStorage}MB</span>
            </div>
            <div className="storage-item">
              <span className="label">Maps Downloaded:</span>
              <span className="value">{offlineMaps.length}</span>
            </div>
            <div className="storage-item">
              <span className="label">Exhibit Categories:</span>
              <span className="value">{offlineExhibits.length}</span>
            </div>
          </div>

          {offlineMaps.length > 0 && (
            <div className="content-section">
              <h2>🗺️ Downloaded Maps</h2>
              {offlineMaps.map((map, index) => (
                <Card key={index} className="content-item">
                  <div className="item-info">
                    <span className="item-name">Museum Map #{map.map_id}</span>
                    <span className="item-date">
                      Downloaded: {new Date(map.downloaded_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDeleteMap(map.map_id)}
                  >
                    Delete
                  </Button>
                </Card>
              ))}
            </div>
          )}

          {offlineExhibits.length > 0 && (
            <div className="content-section">
              <h2>🎨 Downloaded Exhibit Categories</h2>
              {offlineExhibits.map((exhibit, index) => (
                <Card key={index} className="content-item">
                  <div className="item-info">
                    <span className="item-name">{exhibit.category}</span>
                    <span className="item-date">
                      Downloaded: {new Date(exhibit.downloaded_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDeleteExhibit(exhibit.category)}
                  >
                    Delete
                  </Button>
                </Card>
              ))}
            </div>
          )}

          {offlineMaps.length === 0 && offlineExhibits.length === 0 && (
            <div className="empty-state">
              <p>📭 No offline content downloaded yet.</p>
              <Button variant="primary" onClick={() => window.location.href = '/offline-content'}>
                Download Content
              </Button>
            </div>
          )}

          {(offlineMaps.length > 0 || offlineExhibits.length > 0) && (
            <div className="manage-actions">
              <Button variant="danger" onClick={handleClearAll}>
                Delete All Content
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ManageOfflinePage;
