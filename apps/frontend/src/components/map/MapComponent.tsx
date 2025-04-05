import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapComponentProps {
    onMapLoad?: (map: google.maps.Map) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onMapLoad }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
    const [error, setError] = useState<string | null>(null);

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        return <div className="text-red-500 p-4">Error: Google Maps API key is missing</div>;
    }

    useEffect(() => {
        const loader = new Loader({
            apiKey: apiKey,
            version: 'weekly',
            libraries: ['places']
        });

        loader.load().then(() => {
            if (mapRef.current) {
                const newMap = new google.maps.Map(mapRef.current, {
                    center: { lat: 42.3601, lng: -71.0589 }, // Default center
                    zoom: 12,
                    fullscreenControl: true,
                    mapTypeControl: false,
                    streetViewControl: true,
                    zoomControl: true,
                });

                const newDirectionsService = new google.maps.DirectionsService();
                const newDirectionsRenderer = new google.maps.DirectionsRenderer({
                    map: newMap,
                    suppressMarkers: false,
                });

                // Create search box container
                const searchContainer = document.createElement('div');
                searchContainer.style.position = 'absolute';
                searchContainer.style.top = '10px';
                searchContainer.style.left = '10px';
                searchContainer.style.zIndex = '1';
                searchContainer.style.display = 'flex';
                searchContainer.style.flexDirection = 'column';
                searchContainer.style.alignItems = 'flex-start';

                // Create search wrapper for rounded effect
                const searchWrapper = document.createElement('div');
                searchWrapper.style.position = 'relative';
                searchWrapper.style.width = '400px';
                searchWrapper.style.backgroundColor = 'white';
                searchWrapper.style.borderRadius = '24px';
                searchWrapper.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
                searchWrapper.style.margin = '10px';
                searchWrapper.style.transition = 'border-radius 0.2s ease';

                // Create search input
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = 'Search Google Maps';
                input.style.width = '100%';
                input.style.padding = '12px 40px 12px 16px';
                input.style.border = 'none';
                input.style.borderRadius = '24px';
                input.style.fontSize = '16px';
                input.style.outline = 'none';
                input.style.backgroundColor = 'transparent';

                // Create search icon
                const searchIcon = document.createElement('div');
                searchIcon.innerHTML = `
                    <span class="material-icons" style="position: absolute; right: 12px; top: 12px; cursor: pointer; color: #757575;">
                        search
                    </span>
                `;

                // Style the Google Places Autocomplete dropdown
                const styleAutocomplete = () => {
                    const pacContainer = document.querySelector('.pac-container') as HTMLElement;
                    if (pacContainer) {
                        pacContainer.style.marginTop = '0';
                        pacContainer.style.marginLeft = '10px';
                        pacContainer.style.width = '400px';
                        pacContainer.style.border = 'none';
                        pacContainer.style.borderTop = '1px solid #eee';
                        pacContainer.style.borderRadius = '0 0 16px 16px';
                        pacContainer.style.boxShadow = 'none';
                        pacContainer.style.backgroundColor = 'white';

                        // Style individual place suggestions
                        const items = pacContainer.querySelectorAll('.pac-item');
                        items.forEach((item) => {
                            const itemElement = item as HTMLElement;
                            itemElement.style.padding = '8px 16px';
                            itemElement.style.cursor = 'pointer';
                            itemElement.style.border = 'none';
                            itemElement.style.fontSize = '16px';
                            itemElement.style.display = 'flex';
                            itemElement.style.alignItems = 'center';
                            
                            // Add location icon to each suggestion
                            const locationIcon = document.createElement('span');
                            locationIcon.className = 'material-icons';
                            locationIcon.textContent = 'location_on';
                            locationIcon.style.marginRight = '12px';
                            locationIcon.style.color = '#757575';
                            itemElement.insertBefore(locationIcon, itemElement.firstChild);

                            // Style hover state
                            itemElement.addEventListener('mouseover', () => {
                                itemElement.style.backgroundColor = '#f1f1f1';
                            });
                            itemElement.addEventListener('mouseout', () => {
                                itemElement.style.backgroundColor = 'transparent';
                            });
                        });
                    }
                };

                // Create recent searches container
                const recentContainer = document.createElement('div');
                recentContainer.style.padding = '8px 0';
                recentContainer.style.borderTop = '1px solid #eee';
                recentContainer.style.display = 'none';
                recentContainer.style.maxHeight = '400px';
                recentContainer.style.overflowY = 'auto';

                // Show recent searches on focus
                input.addEventListener('focus', () => {
                    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
                    if (recentSearches.length > 0) {
                        searchWrapper.style.borderRadius = '24px 24px 16px 16px';
                        recentContainer.innerHTML = '';
                        recentSearches.forEach((search: any) => {
                            const searchItem = document.createElement('div');
                            searchItem.style.padding = '8px 16px';
                            searchItem.style.cursor = 'pointer';
                            searchItem.style.display = 'flex';
                            searchItem.style.alignItems = 'center';
                            searchItem.innerHTML = `
                                <span class="material-icons" style="margin-right: 12px; color: #757575;">
                                    history
                                </span>
                                ${search.name}
                            `;
                            searchItem.addEventListener('click', () => {
                                input.value = search.name;
                                if (search.location) {
                                    const destination = {
                                        lat: search.location.lat,
                                        lng: search.location.lng,
                                    };
                                    if (userLocation) {
                                        calculateAndDisplayRoute(newDirectionsService, newDirectionsRenderer, userLocation, destination);
                                    }
                                }
                                recentContainer.style.display = 'none';
                                searchWrapper.style.borderRadius = '24px';
                            });
                            searchItem.addEventListener('mouseover', () => {
                                searchItem.style.backgroundColor = '#f1f1f1';
                            });
                            searchItem.addEventListener('mouseout', () => {
                                searchItem.style.backgroundColor = 'transparent';
                            });
                            recentContainer.appendChild(searchItem);
                        });
                        recentContainer.style.display = 'block';
                    }
                });

                // Hide recent searches when clicking outside
                document.addEventListener('click', (e) => {
                    if (!searchWrapper.contains(e.target as Node)) {
                        recentContainer.style.display = 'none';
                        searchWrapper.style.borderRadius = '24px';
                    }
                });

                searchWrapper.appendChild(input);
                searchWrapper.appendChild(searchIcon);
                searchWrapper.appendChild(recentContainer);
                searchContainer.appendChild(searchWrapper);
                mapRef.current.appendChild(searchContainer);

                const searchBox = new google.maps.places.SearchBox(input);

                // Add mutation observer to style autocomplete when it appears
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.addedNodes.length) {
                            mutation.addedNodes.forEach((node) => {
                                if ((node as HTMLElement).className === 'pac-container') {
                                    styleAutocomplete();
                                }
                            });
                        }
                    });
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });

                setMap(newMap);
                setDirectionsService(newDirectionsService);
                setDirectionsRenderer(newDirectionsRenderer);
                setSearchBox(searchBox);

                if (onMapLoad) {
                    onMapLoad(newMap);
                }

                // Get user's current location
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const userPos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            setUserLocation(userPos);
                            newMap.setCenter(userPos);

                            // Add marker for user's location
                            new google.maps.Marker({
                                position: userPos,
                                map: newMap,
                                title: 'Your Location',
                                icon: {
                                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                                }
                            });
                        },
                        (error) => {
                            console.error('Error getting user location:', error);
                            setError('Could not get your location. Please enable location services.');
                        }
                    );
                }

                // Listen for search box changes
                searchBox.addListener('places_changed', () => {
                    const places = searchBox.getPlaces();
                    if (places && places.length > 0) {
                        const place = places[0];
                        if (place.geometry && place.geometry.location) {
                            const destination = {
                                lat: place.geometry.location.lat(),
                                lng: place.geometry.location.lng(),
                            };
                            
                            // Save to recent searches
                            const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
                            const newSearch = {
                                name: place.name,
                                location: destination
                            };
                            const updatedSearches = [newSearch, ...recentSearches.filter((s: any) => s.name !== place.name)].slice(0, 5);
                            localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

                            // Add marker for the searched location
                            new google.maps.Marker({
                                position: destination,
                                map: newMap,
                                title: place.name,
                                icon: {
                                    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                                }
                            });

                            if (userLocation) {
                                calculateAndDisplayRoute(newDirectionsService, newDirectionsRenderer, userLocation, destination);
                            }
                        }
                    }
                });
            }
        }).catch((error) => {
            console.error('Error loading Google Maps:', error);
            setError('Failed to load Google Maps. Please check your API key.');
        });
    }, []);

    const calculateAndDisplayRoute = (
        directionsService: google.maps.DirectionsService,
        directionsRenderer: google.maps.DirectionsRenderer,
        start: google.maps.LatLngLiteral,
        end: google.maps.LatLngLiteral
    ) => {
        directionsService.route(
            {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === 'OK' && response) {
                    directionsRenderer.setDirections(response);
                } else {
                    console.error('Directions request failed:', status);
                    setError('Could not calculate route. Please try again.');
                }
            }
        );
    };

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div 
            ref={mapRef} 
            style={{ 
                width: '100%', 
                height: '100vh',
                position: 'relative'
            }} 
        />
    );
};

export default MapComponent; 