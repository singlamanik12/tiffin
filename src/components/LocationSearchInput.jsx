import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import TextField from "@mui/material/TextField";

const LocationSearchInput = ({ setAddress, error, setCoord, address }) => {
  const [locAddress, setLocAddress] = useState(address);
  const [touched, setTouched] = useState(false);
  const handleChange = (address) => {
    setAddress(address);
    setTouched(true);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setCoord(latLng))
      .catch((error) => console.error("Error", error));
    setLocAddress(address);
    setAddress(address);
  };

  return (
    <>
      <PlacesAutocomplete
        value={address}
        id="address"
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={{ componentRestrictions: { country: "ca" } }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <TextField
              style={{ marginBlock: 10 }}
              fullWidth
              {...getInputProps({
                placeholder: "Address",
                className: "location-search-input",
              })}
              error={error}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div style={{ padding: "10px" }}>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    style={{ padding: "10px", cursor: "pointer" }}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </PlacesAutocomplete>
      {error && touched && (
        <div style={{ color: "red" }}>Please select from suggestions.</div>
      )}
    </>
  );
};
export default LocationSearchInput;
