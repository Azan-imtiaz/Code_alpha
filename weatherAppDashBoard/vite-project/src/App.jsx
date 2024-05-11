
import { useEffect,useState } from "react";
import first from "./assets/a.jpg"
import second2 from "./assets/b.jpg"
import cold from "./assets/cold.jpg"
import Description from "./components/description";
import { getFormattedWeatherData } from "./weatherService";


function App() {

  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
 

  useEffect(()=>{
  
    const fetchWeather=async ()=>{
      const data=await getFormattedWeatherData(city,units);
      setWeather(data);
    }

    fetchWeather();

  },[units,city])

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };


  return (
    <div className="app" style={{ backgroundImage: `url(${second2})` }}>

      <div className="header">

   {
    weather &&   <div className="con">
    <div className="section smallSection__input">

      <input type="text" name="city" placeholder="Enter City..." onKeyDown={enterKeyPressed} />

      <button onClick={handleUnitsClick}>°F</button>


    </div>


    <div className="section heroSection__temperature">
      <div className="icom">
        <h3>{`${weather.name},${weather.country}`}</h3>
        <img src={weather.iconURL} alt="Weather icon" />
        <h3>{weather.description}</h3>
      </div>

      <div className="temperature">
        <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
      </div>
    </div>




    {/* bottom description */}
    <Description  weather={weather} units={units} />


  </div>
   }


      
      </div>



    </div>
  )
}

export default App
