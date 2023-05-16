import { AutoComplete } from "antd";
import axios from "axios";
import { useState } from "react";

function SearchComponent({ onLocationSelect }) {
  // Autocomplete API
  const [options, setOptions] = useState([]);
  console.log(options);
  const handleChange = async (value) => {
    if (value) {
      try {
        const response = await axios.get(
          `https://api.bmapsbd.com/search/autocomplete/web?search=${value}`
        );
        const results = response.data.places;
        const newOptions = results.map((result) => ({
          key: result.id,
          value: result.Address,
          label: result.Address,
          longitude: Number(result.longitude),
          latitude: Number(result.latitude),
        }));

        setOptions(newOptions);
        if (newOptions.length === 1) {
          const { longitude, latitude } = newOptions[0];
          onLocationSelect(latitude, longitude);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setOptions([]);
    }
  };

  const handleSelect = (value) => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      const { latitude, longitude } = selectedOption;
      onLocationSelect(latitude, longitude);
    }
    console.log(selectedOption);
  };

  return (
    <div style={{ marginRight: "20px", height: "100%" }}>
      <AutoComplete
        style={{ width: "100%" }}
        options={options}
        onChange={handleChange}
        onSelect={handleSelect}
        placeholder="Search in map"
      />
    </div>
  );
}

export default SearchComponent;
