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
        <Col span={12}>
          <SearchComponent onLocationSelect={handleLocationSelect} />
        </Col>
        <Col span={12}>
          <MapComponent
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
