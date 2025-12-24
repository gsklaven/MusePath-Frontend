import React from 'react';
import Button from './Button';
import SearchBar from './SearchBar';
import Card from './Card';

/**
 * RouteStopSearch Component
 * Provides search functionality to add new stops to the route.
 *
 * @param {Object} props
 * @param {boolean} props.show - Whether the search section is visible.
 * @param {function} props.onToggle - Handler to toggle visibility.
 * @param {function} props.onSearch - Handler for search input.
 * @param {Array} props.searchResults - Array of search result objects.
 * @param {function} props.onAdd - Handler to add a search result as a stop.
 */
const RouteStopSearch = ({ show, onToggle, onSearch, searchResults, onAdd }) => {
  return (
    <>
      <Button 
        variant="secondary" 
        onClick={onToggle}
        className="add-stops-btn"
      >
        {show ? '- Cancel Adding Stops' : '+ Add Stops'}
      </Button>

      {show && (
        <div className="add-stops-section">
          <SearchBar 
            onSearch={onSearch}
            placeholder="Search for exhibits to add..."
          />
          
          {/* Display search results if any */}
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(result => (
                <Card 
                  key={result.exhibit_id}
                  className="result-card"
                  onClick={() => onAdd(result)}
                >
                  <span>{result.title}</span>
                  <span className="add-icon">+</span>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RouteStopSearch;