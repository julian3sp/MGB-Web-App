import React, { useState, useRef, useEffect } from 'react';

interface SearchContainerProps {
  onPlaceSelected: (place: { name: string; location: google.maps.LatLngLiteral }) => void;
  userLocation: google.maps.LatLngLiteral | null;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ onPlaceSelected, userLocation }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Load recent searches on mount.
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Initialize the Google Maps SearchBox once the input is available.
  useEffect(() => {
    if (!inputRef.current) return;
    const searchBox = new google.maps.places.SearchBox(inputRef.current);

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (!userLocation) {
        console.warn("User location not yet available.");
        return;
      }
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry && place.geometry.location) {
          const destination = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };

          // Update search value
          const placeName = place.name || 'Unknown location';
          setSearchValue(placeName);

          // Update recent searches.
          const newSearch = { name: placeName, location: destination };
          const updatedSearches = [
            newSearch,
            ...recentSearches.filter((s) => s.name !== placeName),
          ].slice(0, 5);
          setRecentSearches(updatedSearches);
          localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

          // Notify the parent.
          onPlaceSelected(newSearch);
        }
      }
    });
  }, [userLocation, recentSearches, onPlaceSelected]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '400px',
          backgroundColor: 'white',
          borderRadius: showRecent ? '24px 24px 16px 16px' : '24px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          margin: '10px',
          transition: 'border-radius 0.2s ease',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Google Maps"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            width: '100%',
            padding: '11px 40px 11px 16px',
            border: 'none',
            borderRadius: '24px',
            fontSize: '14px',
            outline: 'none',
            backgroundColor: 'transparent',
          }}
          onFocus={() => setShowRecent(true)}
          onBlur={() => setTimeout(() => setShowRecent(false), 200)}
        />
        <div
          style={{
            position: 'absolute',
            right: '12px',
            top: '10px',
            cursor: 'pointer',
            color: '#757575',
          }}
        >
          <span className="material-icons">search</span>
        </div>
        {showRecent && recentSearches.length > 0 && (
          <div
            style={{
              padding: '0',
              borderTop: '1px solid #e8eaed',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            {recentSearches.map((search, index) => (
              <div
                key={index}
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid #e8eaed',
                }}
                onClick={() => {
                  if (search.location && userLocation) {
                    setSearchValue(search.name);
                    onPlaceSelected(search);
                  }
                  setShowRecent(false);
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.backgroundColor = '#f1f3f4')
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent')
                }
              >
                <span
                  className="material-icons"
                  style={{
                    marginRight: '12px',
                    color: '#70757a',
                    fontSize: '18px',
                  }}
                >
                  history
                </span>
                {search.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
