import styles from "./style.module.css";
import { useState, useMemo, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function LocationSearchInput({ setSelected }) {
  const [address, setAddress] = useState("");
  const [stateLatLng, setStateLatLng] = useState();

  const handleSelect = async (address) => {
    const results = await geocodeByAddress(address).catch(err => console.log(err));
    if (results) {
      const latLng = await getLatLng(results[0]);
      setStateLatLng(latLng);
    }
  };
  useEffect(() => {
    if (stateLatLng) {
      setSelected((prev) => [...prev, stateLatLng]);
    }
  }, [stateLatLng]);

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(address) => setAddress(address)}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "location-search-input",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
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
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
