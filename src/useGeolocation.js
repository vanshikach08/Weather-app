import { useState, useEffect } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => console.error("Error getting location: ", err)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return location;
};
