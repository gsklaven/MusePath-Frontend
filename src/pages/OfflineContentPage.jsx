import React, { useState } from 'react';
import { downloadMap, downloadExhibit } from '../api/maps';
import { EXHIBIT_CATEGORIES } from '../utils/constants';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/helpers';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import './OfflineContentPage.css';

const OfflineContentPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleToggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleDownload = async () => {
    if (selectedCategories.length === 0) {
      alert('Please select at least one category to download.');
      return;
    }

    setDownloading(true);
    setProgress(0);

    try {
      // Download map
      const mapBlob = await downloadMap(1);
      const offlineMaps = getFromLocalStorage('offline_maps') || [];
      offlineMaps.push({
        map_id: 1,
        downloaded_at: new Date().toISOString(),
      });
      saveToLocalStorage('offline_maps', offlineMaps);
      setProgress(50);

      // Simulate downloading exhibits for selected categories
      const offlineExhibits = getFromLocalStorage('offline_exhibits') || [];
      selectedCategories.forEach(category => {
        offlineExhibits.push({
          category,
          downloaded_at: new Date().toISOString(),
        });
      });
      saveToLocalStorage('offline_exhibits', offlineExhibits);
      setProgress(100);

      alert('Content downloaded successfully for offline use!');
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download content. Please try again.');
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div>
      <Header />
      <div className="container offline-content-container">
        <Card>
          <h1>📥 Download Content for Offline Use</h1>
          <p className="description">
            Select categories of content to download and access when you're offline.
          </p>

          <div className="categories-section">
            <h2>Select Categories</h2>
            <div className="categories-grid">
              {EXHIBIT_CATEGORIES.map(category => (
                <button
                  key={category}
                  className={`category-button ${
                    selectedCategories.includes(category) ? 'selected' : ''
                  }`}
                  onClick={() => handleToggleCategory(category)}
                >
                  <span className="category-icon">
                    {selectedCategories.includes(category) ? '✓' : ''}
                  </span>
                  <span className="category-name">{category}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="storage-info">
            <p>📊 Estimated storage: ~{selectedCategories.length * 15}MB</p>
          </div>

          {downloading && (
            <div className="download-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="progress-text">Downloading... {progress}%</p>
            </div>
          )}

          <div className="download-actions">
            <Button 
              variant="success" 
              onClick={handleDownload}
              disabled={downloading || selectedCategories.length === 0}
            >
              {downloading ? 'Downloading...' : 'Download Selected Content'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OfflineContentPage;
