import React, { useState, useRef, useEffect } from 'react';

interface SearchContainerProps {
  onPlaceSelected: (place: { name: string; location: google.maps.LatLngLiteral }) => void;
  placeholder?: string;
  onGetCurrentLocation: () => void;
}

interface SearchItem {
  name: string;
  location: google.maps.LatLngLiteral;
}

const MAX_RECENT_SEARCHES = 3;

const SearchContainer: React.FC<SearchContainerProps> = ({ 
  onPlaceSelected, 
  placeholder = "Search Google Maps", 
  onGetCurrentLocation 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [recentSearches, setRecentSearches] = useState<SearchItem[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Load recent searches on mount.
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SearchItem[];
        setRecentSearches(parsed.slice(0, MAX_RECENT_SEARCHES));
      } catch (e) {
        console.error('Failed to parse recent searches', e);
      }
    }
  }, []);

  // Initialize the Google Maps SearchBox once the input is available.
  useEffect(() => {
    if (!inputRef.current) return;
    const searchBox = new google.maps.places.SearchBox(inputRef.current);

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
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

          // Update recent searches - only keep the 3 most recent
          const newSearch: SearchItem = { name: placeName, location: destination };
          const updatedSearches = [
            newSearch,
            ...recentSearches.filter((s) => s.name !== placeName),
          ].slice(0, MAX_RECENT_SEARCHES);
          setRecentSearches(updatedSearches);
          localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

          // Notify the parent.
          onPlaceSelected(newSearch);
        }
      }
    });
  }, [recentSearches, onPlaceSelected]);

  const handleRecentSearchClick = (search: SearchItem) => {
    if (search.location) {
      setSearchValue(search.name);
      onPlaceSelected(search);
    }
    setShowRecent(false);
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div className={`relative w-[90%] ml-auto bg-white rounded-3xl shadow-lg mb-0 transition-all duration-200 ${
        showRecent ? 'rounded-b-none' : ''
      }`}>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full py-2.5 px-4 border-none rounded-3xl font-[poppins] text-sm outline-none bg-transparent"
          onFocus={() => setShowRecent(true)}
          onBlur={() => setTimeout(() => setShowRecent(false), 200)}
        />
        <div className="absolute right-3 top-2.5 cursor-pointer text-gray-500">
          <span className="material-icons">search</span>
        </div>
      </div>
      {showRecent && (
        <div className="absolute w-[90%] right-0 mt-[42px] bg-white rounded-b-2xl shadow-lg z-50 max-h-48 overflow-y-auto">
          <div className="py-2">
            {/* Your location option */}
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center border-b border-gray-100"
              onClick={() => {
                onGetCurrentLocation();
                setSearchValue('Your location');
                setShowRecent(false);
              }}
            >
              <span className="material-icons font-[poppins] text-blue-500 mr-3">my_location</span>
              <span className="text-sm font-[poppins] text-gray-700">Your location</span>
            </div>
            
            {/* Recent searches */}
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleRecentSearchClick(search)}
              >
                <span className="material-icons text-gray-400 mr-3">history</span>
                <span className="text-sm font-[poppins] text-gray-700">{search.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchContainer;