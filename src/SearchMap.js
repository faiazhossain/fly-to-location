import React, { useState, useEffect, useRef } from "react";
import { Input, AutoComplete, Row, Col } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import bkoigl from "bkoi-gl"; // Assuming you have installed the 'bkoi-gl' library

const { Search } = Input;

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    const initializeMap = () => {
      const map = new bkoigl.Map({
        container: mapContainerRef.current,
        center: [90.3938010872331, 23.821600277500405],
        zoom: 12,
        style: "http://20.244.112.255:8080/styles/barikoi-tests/style.json",
      });
      return map;
    };
    let map = null;
    setTimeout(() => {
      map = initializeMap();
    }, 0);
    return () => {
      if (map) {
        map.remove(); // Cleanup the map when the component unmounts
      }
    };
  }, []);
  return (
    <div
      style={{
        height: "100%",
        border: "1px solid #ccc",
        boxSizing: "border-box",
      }}
      ref={mapContainerRef}
    ></div>
  );
};

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // Function to handle the search input change
  const handleSearchChange = (value) => {
    setSearchValue(value);
    // Fetch suggestions from your API or any other data source
    // For simplicity, we'll generate some dummy suggestions here
    const newSuggestions = Array.from({ length: 5 }, (_, index) => ({
      value: `${value}${index}`,
    }));
    setSuggestions(newSuggestions);
  };
  // Function to handle suggestion selection
  const handleSelect = (value) => {
    setSearchValue(value);
    setSuggestions([]); // Clear suggestions
    // Perform any necessary actions with the selected location
    console.log("Selected location:", value);
  };
  return (
    <div style={{ marginRight: "20px", height: "100%" }}>
      <AutoComplete
        value={searchValue}
        options={suggestions}
        onSelect={handleSelect}
        onSearch={handleSearchChange}
      >
        <Search placeholder="Search for a location" enterButton />
      </AutoComplete>
    </div>
  );
};

const SearchMap = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Row style={{ height: "100%" }}>
        <Col span={12}>
          <SearchComponent />
        </Col>
        <Col span={12}>
          <MapComponent />
        </Col>
      </Row>
    </div>
  );
};

export default SearchMap;
