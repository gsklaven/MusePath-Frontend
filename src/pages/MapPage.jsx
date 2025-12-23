/**
 * MapPage Component
 * 
 * Primary interactive museum map interface displaying exhibits as clickable markers.
 * Central hub for navigation, exhibit discovery, and route planning within the museum.
 * 
 * Core Functionality:
 * - Interactive Map: Displays museum floor plan with positioned exhibit markers
 * - Exhibit Selection: Click markers to view detailed information in bottom sheet
 * - Search Integration: Real-time search for exhibits with autocomplete results
 * - Navigation: Quick access to route planning and current location features
 * - Favorites Access: Direct link to user's saved favorite exhibits
 * - Personalized Routes: Integration with AI-powered route recommendations
 * 
 * Map Features:
 * - 4 Mock Exhibits: Statue A, Statue B, Vase C, Mosaic D with historical periods
 * - Positioned Markers: Each exhibit placed at specific coordinates on map image
 * - Visual Icons: Custom icon for each exhibit type (statues, vases, mosaics)
 * - Audio Indicators: Shows which exhibits have audio guide availability
 * 
 * User Interactions:
 * - Click exhibit markers to open detailed bottom sheet with multi-page layout
 * - Search bar at top for finding specific exhibits by name/period/artist
 * - FAB buttons for quick actions: favorites, personalized routes, current location
 * - Search results display as overlay with clickable list items
 * 
 * Bottom Sheet Integration:
 * - Displays selected exhibit with Info, Route, and About pages
 * - Enables favoriting, audio playback, and navigation from exhibit details
 * - Closes on backdrop click or close button
 * 
 * State Management:
 * - selectedExhibit: Currently selected exhibit object with full details
 * - searchTerm: Current search query string
 * - searchResults: Array of matching exhibits from search API
 * - showSearchResults: Boolean toggle for search results overlay visibility
 * 
 * API Integration:
 * - getExhibitById(): Fetches full exhibit details when marker clicked
 * - searchExhibits(): Returns matching exhibits based on search term
 * - Falls back to mock data if API calls fail for graceful degradation
 * 
 * Navigation Actions:
 * - Favorites button: Navigates to /favourites page
 * - Personalized Routes: Navigates to /personalized-route with location data
 * - Map markers: Opens bottom sheet for exhibit details and navigation
 * 
 * Mock Data Structure:
 * Each exhibit includes: exhibitId, name, subtitle, description, mapPosition, icon, audioGuideUrl
 * Map positions use percentage-based left/top coordinates for responsive layout
 */
import React, { useState } from 'react';
import { getExhibitById, searchExhibits } from '../api/exhibits';
import { useNavigate } from 'react-router-dom';
import './MapPage.css';
import { ExhibitBottomSheet, MapMarkers, MapSearchOverlay, MapRouteButton, MapFloatingButtons } from '../components';

// Hardcoded mock data for 4 monuments representing museum exhibits with historical context
const mockExhibits = [
  {
    exhibitId: 1,
    name: 'Statue A',
    subtitle: 'Ancient Greece | 650 BC',
    description: "Statue A is a remarkable example of Ancient Greek artistry, reflecting the era's mastery of proportion and movement.",
    mapPosition: { left: '25%', top: '20%' },
    icon: '/assets/icons/mon1.png',
    audioGuideUrl: '/audio/exhibits/1.mp3',
  },
  {
    exhibitId: 2,
    name: 'Statue B',
    subtitle: 'Roman Empire | 120 AD',
    description: 'Statue B stands as a testament to Roman engineering and artistic prowess. Its detailed armor and lifelike stance reflect the importance of military might and civic duty in Roman society.',
    mapPosition: { left: '50%', top: '40%' },
    icon: '/assets/icons/mon2.png',
    audioGuideUrl: '',
  },
  {
    exhibitId: 3,
    name: 'Vase C',
    subtitle: 'Classical Athens | 450 BC',
    description: 'Vase C features intricate designs and scenes from daily life in Classical Athens, showcasing the artistry of ancient potters.',
    mapPosition: { left: '70%', top: '60%' },
    icon: '/assets/icons/mon3.png',
    audioGuideUrl: '/audio/exhibits/3.mp3',
  },
  {
    exhibitId: 4,
    name: 'Mosaic D',
    subtitle: 'Byzantine Era | 900 AD',
    description: 'Mosaic D is a stunning example of Byzantine craftsmanship, with vibrant colors and religious iconography.',
    mapPosition: { left: '35%', top: '75%' },
    icon: '/assets/icons/mon4.png',
    audioGuideUrl: '',
  },
];

const MapPage = () => {
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  // Handler for marker click
  const handleMarkerClick = async (exhibit) => {
    try {
      const data = await getExhibitById(exhibit.exhibitId, 'online');
      // Unwrap backend response if wrapped in { success, data, ... }
      const exhibitData = data && data.data ? data.data : data;
      setSelectedExhibit({ ...exhibitData, mapPosition: exhibit.mapPosition, icon: exhibit.icon });
    } catch (err) {
      // fallback to mock data if API fails
      setSelectedExhibit(exhibit);
    }
  };

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      console.log('🔎 Searching for:', searchTerm);
      const results = await searchExhibits(searchTerm, null, 'online');
      const exhibitsArray = results && results.data ? results.data : results;
      setSearchResults(exhibitsArray || []);
      setShowSearchResults(true);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
      setShowSearchResults(true);
    }
  };

  // Handle search result click
  const handleSearchResultClick = async (result) => {
    setShowSearchResults(false);
    setSearchTerm('');
    
    // Backend returns exhibitId (camelCase), not exhibit_id
    const exhibitId = result.exhibitId || result.exhibit_id;
    
    // Find matching exhibit in mockExhibits or fetch from API
    const mockExhibit = mockExhibits.find(e => e.exhibitId === exhibitId);
    if (mockExhibit) {
      await handleMarkerClick(mockExhibit);
    } else {
      try {
        const data = await getExhibitById(exhibitId, 'online');
        const exhibitData = data && data.data ? data.data : data;
        setSelectedExhibit(exhibitData);
      } catch (err) {
        console.error('Error fetching exhibit:', err);
      }
    }
  };

  return (
    <div
      className="map-view-static"
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        minWidth: '100vw',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#e3ecd6',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      {/* Map background */}
      <img
        src={process.env.PUBLIC_URL + '/assets/bg.png'}
        alt="Museum Map"
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          background: '#e3ecd6',
        }}
      />
      
      {/* Markers */}
      <MapMarkers exhibits={mockExhibits} onMarkerClick={handleMarkerClick} />

      {/* Exhibit Bottom Sheet */}
      <ExhibitBottomSheet
        exhibit={selectedExhibit}
        open={!!selectedExhibit}
        onClose={() => setSelectedExhibit(null)}
      />

      {/* Top right floating buttons */}
      <MapFloatingButtons 
        onSettingsClick={() => navigate('/settings')} 
        onLayersClick={() => {}} 
      />

      {/* Generate Personalized Route Button */}
      <MapRouteButton onClick={() => navigate('/personalized-route')} />

      {/* Search Bar */}
      <MapSearchOverlay 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchSubmit={handleSearch}
        searchResults={searchResults}
        showResults={showSearchResults}
        onResultClick={handleSearchResultClick}
      />
    </div>
  );
};

export default MapPage;
