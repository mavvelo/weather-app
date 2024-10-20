import { useState } from "react"; 
import { BiSearch } from "react-icons/bi";
import { BiCurrentLocation } from "react-icons/bi";

export const Inputs = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState(""); // State to track error message

  // Handle search by clicking the search icon or hitting Enter
  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
      setError(""); // Clear any existing error when input is valid
    } else {
      setError("Please enter a valid location.");
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  // Handle location-based search
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setQuery({ lat: latitude, lon: longitude });
          setError(""); // Clear error on successful location search
        },
        () => {
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="flex flex-col items-center my-6">
      {/* Input section */}
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={handleKeyPress} // Listen for Enter key press
          type="text"
          placeholder="Search location ..."
          className="text-gray-500 text-xl font-light p-2 w-full shadow-xl 
          capitalize focus:outline-none placeholder:lowercase"
        />
        <BiSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <BiCurrentLocation
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}

      {/* Temperature unit toggle */}
      <div className="flex flex-row w-1/4 items-center justify-center mt-4">
        <button
          className="text-4xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("metric")}
        >
          <span>&deg;C</span>
        </button>
        <p className="text-xl font-medium mx-1">|</p>
        <button
          className="text-4xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("imperial")}
        >
          <span>&deg;F</span>
        </button>
      </div>
    </div>
  );
};

export default Inputs;