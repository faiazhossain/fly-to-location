import React, { useEffect, useRef } from "react";
import bkoigl from "bkoi-gl";

function MapComponent({ latitude, longitude }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new bkoigl.Map({
      container: mapContainerRef.current,
      center: [90.3938010872331, 23.821600277500405],
      zoom: 12,
      style: "http://20.244.112.255:8080/styles/barikoi-tests/style.json",
    });

    // Fly animation when props change
    map.flyTo({
      center: [longitude, latitude],
      zoom: 18,
      speed: 1.2,
      curve: 1.42,
      easing: (t) => t,
    });

    return () => {
      map.remove(); // Cleanup the map when the component unmounts
    };
  }, [latitude, longitude]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
}
export default MapComponent;
