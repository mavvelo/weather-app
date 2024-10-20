import { useState } from 'react';
import { useEffect } from "react"; 
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TempAndDetails from "./components/TempAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import { TopBottons } from "./components/TopBottons";
import getFormattedWeatherData from "./services/WeatherService";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
} 

const App = () => {

  const [query, setQuery] = useState({ q: "accra"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);


    await getFormattedWeatherData ({ ...query, units }).then( (data) => {
      toast.success(`Fetched weather daa for ${data.name}, ${data.country}`);
      setWeather(data)
    });
    console.log();
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

const formatBackground = () => {
    if (!weather) return "from-blue-700 to-green-900";
    const threshold = units === "imperial" ? 20 : 60;
    if (weather.temp <= threshold) return "from-blue-700 to-green-800";
    return "from-yellow-600 to-orange-700";
  };

  return (
    <div 
    className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br
    shadow-xl from-gray-400 ${formatBackground()}`}
     >
    <TopBottons setQuery={setQuery} />
    <Inputs setQuery={setQuery} setUnits={setUnits} />

    {weather && (
      <>
        <TimeAndLocation weather={weather}  />
        <TempAndDetails weather={weather} units={units} />
         <Forecast title="Hourly forecast" data={weather.hourly}/>
          <Forecast title="Weekly forecast" data={weather.daily} />
          </>
    )}
    
    <ToastContainer autoClose={25000} hideProgressBar={false} theme="colored" />
    </div>
  );
};

export default App;
