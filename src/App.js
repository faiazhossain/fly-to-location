import React, { useState } from "react";
import { Col, Row } from "antd";
import SearchComponent from "./SearchComponent";
import MapComponent from "./MapComponent";

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 23.821600277500405,
    longitude: 90.3938010872331,
  });

  const handleLocationSelect = (latitude, longitude) => {
    setSelectedLocation({ latitude, longitude });
  };

  return (
    <div style={{ height: "100vh" }}>
      <Row style={{ height: "100%" }}>
        <Col span={24} style={{ position: "relative", height: "100%" }}>
          <MapComponent
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              paddingTop: "10px",
              padding: "20px",
              borderRadius: "20px",
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            <SearchComponent
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                paddingTop: "10px",
                padding: "20px",
                borderRadius: "20px",
                backgroundColor: "red",
                color: "white",
              }}
              onLocationSelect={handleLocationSelect}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
