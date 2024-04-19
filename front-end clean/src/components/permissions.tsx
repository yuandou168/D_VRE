import React, { useState, useEffect } from "react";

function GeolocationComponent() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err: GeolocationPositionError) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <div>
      {latitude && longitude ? (
        <div>
          Latitude: {latitude}, Longitude: {longitude}
        </div>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
}

export default GeolocationComponent;
