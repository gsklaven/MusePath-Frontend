/**
 * ManageOfflinePage Component
 * 
 * Offline content management interface for downloading and managing maps and exhibits.
 * Enables users to download museum content for offline access when internet is unavailable.
 * 
 * Purpose:
 * - Prepare content for offline museum visits where WiFi/cellular may be unavailable
 * - Manage device storage by viewing and deleting downloaded content
 * - Track approximate storage usage of offline content
 * 
 * Features:
 * - Content Categories: Separate sections for offline maps and exhibits
 * - Download Functionality: Download individual maps (ID 1-3) and exhibits (ID 1-10)
 * - Storage Tracking: Displays approximate total storage used (20MB/map, 5MB/exhibit)
 * - Expandable Sections: Collapsible panels for maps and exhibits lists
 * - Delete Operations: Remove individual items to free up storage space
 * - Download Status: Visual feedback during download operations
 * - Persistence: Stores download metadata in localStorage with timestamps
 * 
 * Content Management:
 * - Maps Section: Downloads full museum floor plans and layouts
 * - Exhibits Section: Downloads exhibit details, images, and audio guides
 * - Each item shows download timestamp and size estimate
 * - Delete confirmations prevent accidental removals
 * 
 * State Management:
 * - offlineMaps: Array of downloaded map objects with IDs and timestamps
 * - offlineExhibits: Array of downloaded exhibit objects with metadata
 * - totalStorage: Calculated storage usage in MB
 * - expandMaps/expandExhibits: Toggle visibility of content lists
 * - downloading: Tracks currently downloading item (null when idle)
 * 
 * API Integration:
 * - downloadMap(id): Fetches and caches map data for offline use
 * - downloadExhibit(id): Fetches and caches exhibit data including audio
 * - localStorage: Persists download metadata and content availability
 * 
 * Storage Estimates:
 * - Maps: ~20MB each (includes floor plans, markers, navigation data)
 * - Exhibits: ~5MB each (includes images, descriptions, audio guides)
 * - Total displayed as sum of all downloaded content
 */
import React, { useState, useEffect } from 'react';
import { downloadExhibit } from '../api/exhibits';
import { downloadMap } from '../api/maps';
import { OfflineDownloadSection, OfflineStorageOverview, OfflineItemList } from '../components';
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

  // Load offline content metadata from localStorage
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

  // Download map data and save to localStorage
  const handleDownloadMap = async (mapId) => {
    try {
      setDownloading(`map-${mapId}`);
      console.log('📥 Downloading map:', mapId);
      
      await downloadMap(mapId);
      
      // Store in localStorage
      const maps = JSON.parse(localStorage.getItem('offlineMaps') || '[]');
      // Check for duplicates before adding
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

  // Download exhibit data and save to localStorage
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

  // Delete map from offline storage
  const handleDeleteMap = (mapId) => {
    const maps = offlineMaps.filter(m => m.map_id !== mapId);
    localStorage.setItem('offlineMaps', JSON.stringify(maps));
    setOfflineMaps(maps);
  };

  // Delete exhibit from offline storage
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

        <OfflineDownloadSection 
          downloading={downloading}
          onDownloadMap={handleDownloadMap}
          onDownloadExhibit={handleDownloadExhibit}
        />

        <div style={{ width: '100%', maxWidth: 420, background: '#f7f7f7', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 0, margin: '0 auto' }}>
          <OfflineStorageOverview totalStorage={totalStorage} />
          
          <OfflineItemList 
            title="Maps Downloaded"
            count={offlineMaps.length}
            icon="/assets/icons/maps.png"
            isExpanded={expandMaps}
            onToggle={() => setExpandMaps(e => !e)}
            items={offlineMaps}
            emptyMessage="No maps downloaded yet."
            onDelete={handleDeleteMap}
            renderItemLabel={(map) => `Map ID: ${map.map_id}`}
            getId={(map) => map.map_id}
          />

          <OfflineItemList 
            title="Exhibits Downloaded"
            count={offlineExhibits.length}
            icon="/assets/icons/museum.png"
            isExpanded={expandExhibits}
            onToggle={() => setExpandExhibits(e => !e)}
            items={offlineExhibits}
            emptyMessage="No exhibits downloaded yet."
            onDelete={handleDeleteExhibit}
            renderItemLabel={(ex) => ex.title}
            getId={(ex) => ex.exhibit_id}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageOfflinePage;