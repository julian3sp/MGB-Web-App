import React, { useState, useRef, useEffect } from 'react';

interface SearchContainerProps {
  onPlaceSelected: (place: { name: string; location: google.maps.LatLngLiteral }) => void;
  placeholder?: string;
}

const MAX_RECENT_SEARCHES = 3;

const SearchContainer: React.FC<SearchContainerProps> = ({ onPlaceSelected, placeholder = "Search Google Maps" }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Load recent searches on mount.
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure we only keep the most recent 3 searches
      setRecentSearches(parsed.slice(0, MAX_RECENT_SEARCHES));
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
          const newSearch = { name: placeName, location: destination };
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

  return (
    <div className="relative z-10 right-3 flex flex-col items-start">
      <div className={`relative w-full bg-white rounded-3xl shadow-lg m-2 transition-all duration-200 ${
        showRecent ? 'rounded-b-2xl' : 'rounded-3xl'
      }`}>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full py-2.5 px-4 pl-4 pr-10 border-none rounded-3xl text-sm outline-none bg-transparent"
          onFocus={() => setShowRecent(true)}
          onBlur={() => setTimeout(() => setShowRecent(false), 200)}
        />
        <div className="absolute right-3 top-2.5 cursor-pointer text-gray-500">
          <span className="material-icons">search</span>
        </div>
        {showRecent && recentSearches.length > 0 && (
          <div className="p-0 border-t border-gray-200 max-h-48 overflow-y-auto">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="p-2 px-4 cursor-pointer flex items-center border-b border-gray-200 hover:bg-gray-100"
                onClick={() => {
                  if (search.location) {
                    setSearchValue(search.name);
                    onPlaceSelected(search);
                  }
                  setShowRecent(false);
                }}
              >
                <span className="material-icons mr-3 text-gray-500 text-lg">
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
