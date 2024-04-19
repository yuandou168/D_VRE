import React from 'react';
import { useState } from 'react';

const LocationComponent: React.FC = () => {

  const [selectedLatitude, setSelectedLatitude] = useState<number>();
  const [selectedLongitude, setSelectedLongitude] = useState<number>();
  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLatitude(latitude)
          setSelectedLongitude(longitude)

          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        //   alert('Error getting location:', error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <input type="text" value={selectedLatitude} placeholder="Latitude" />
      <input type="text" value={selectedLongitude} placeholder="Longitude" />
      <button onClick={getLocation}>Get Location</button>
    </div>
  );
};

export default LocationComponent;
