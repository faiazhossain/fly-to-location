import React, { useEffect, useRef } from "react";
import bkoigl from "bkoi-gl";

function MapComponent({ latitude, longitude }) {
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const map = new bkoigl.Map({
      container: mapContainerRef.current,
      center: [90.3938010872331, 23.821600277500405],
      zoom: 12,
      style: "http://20.244.112.255:8080/styles/barikoi-tests/style.json",
    });

    // Add marker if latitude and longitude are valid
    if (latitude && longitude) {
      const marker = new bkoigl.Marker({ draggable: true })
        .setLngLat([longitude, latitude])
        .addTo(map);

      // Fly animation to the selected location
      map.flyTo({
        center: [longitude, latitude],
        zoom: 16,
        speed: 1.2,
        curve: 1.42,
        easing: (t) => t,
      });

      markerRef.current = marker;
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
      map.remove();
    };
  }, [longitude, latitude]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "90vh" }} />
  );
}

export default MapComponent;
