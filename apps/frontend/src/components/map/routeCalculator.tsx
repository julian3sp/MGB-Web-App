export const calculateAndDisplayRoute = (
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    map: google.maps.Map,
    start: google.maps.LatLngLiteral,
    end: google.maps.LatLngLiteral,
    setError: (msg: string) => void
  ) => {
    // Clear any old route.
    directionsRenderer.setDirections({ routes: [] });
    directionsRenderer.setMap(map);
  
    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK' && response) {
          directionsRenderer.setDirections(response);
  
          // Optional: adjust the viewport to fit the route.
          const bounds = new google.maps.LatLngBounds();
          response.routes[0].overview_path.forEach((point) => bounds.extend(point));
          map.fitBounds(bounds);
        } else {
          console.error('Directions request failed:', status);
          setError('Could not calculate route. Please try again.');
        }
      }
    );
  };
  