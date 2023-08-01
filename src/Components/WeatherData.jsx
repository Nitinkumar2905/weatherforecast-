import React, { useEffect, useState } from "react";
import {
  WiHumidity,
  WiStrongWind,
  WiDaySunny,
  WiDayFog,
  WiBarometer,
  WiCloud,
} from "react-icons/wi";
import "./Weather.css";
import { v4 as uuidv4 } from "uuid";
import loadingBar from './img/loading.gif'
import loadingt from './img/loadingt.gif'

const WeatherData = () => {
  const [info, setInfo] = useState({
    city: "",
    temp: "",
    humidity: "",
    wind_speed: "",
    visibility: "",
    pressure: "",
    condition: "",
  });
  const [weatherForecastData, setWeatherForecastData] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  //   const [searchLocation, setSearchLocation] = useState("");

  // Function to get the user's current location
  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `${position.coords.latitude},${position.coords.longitude}`
          );
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const weatherData = async () => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&country=india&days=3`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": '6df67ca40emsh54451cad843c528p17f8b9jsn4d9fa3d544e6',
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setInfo({
        city: data.location.name,
        temp: data.current.temp_c,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_kph,
        visibility: data.current.vis_km,
        pressure: data.current.pressure_mb,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
      });
      setWeatherForecastData(data.forecast.forecastday);
      console.log(data);
      console.log(data.forecast);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Get the user's geolocation when the component mounts
    getGeolocation();
  }, []);

  useEffect(() => {
    weatherData();
  }, [location]);

  return (
    <>
      {!loading ? (
        <div className="mt-3 d-flex flex-column align-items-center justify-content-center">
          {/* <div className="mb-5 d-flex position-relative rounded-2 px-3 py-2" style={{color:'yellow',backgroundColor:'black'}}>
            Note :&nbsp; &nbsp;
            <div className="d-flex flex-column" style={{color:'white',width:'30vw'}}>
              <span>
                1. You can use coordinates for particular area's weather report.
              </span>
              <span style={{display:'flex',flexWrap:'wrap'}}>
                2. Weather report for your location may not be 100% correct because of security concerns and use of VPNs.
              </span>
            </div>
          </div> */}
          <div className="d-flex">
            <h5 className="mx-2 my-2">Search location</h5>
            <input
              onChange={handleLocationChange}
              className="border-black px-2 py-0 rounded-2 border-2 mx-2"
              type="text"
              placeholder="location"
              value={location}
            />
            {/* <button
              onClick={weatherData}
              className="btn btn-primary mx-2 shadow-sm"
            >
              Check Weather
            </button> */}
          </div>

          <div className="d-flex mt-2" id="weather-output">
            {/* output */}
            <div className="mt-5">
              <div className="mx-4 mb-2 text-center">Today's weather</div>
              <div
                className="m-3 p-4 rounded-4 d-flex flex-column"
                style={{
                  border: "2px solid black",
                }}
              >
                {info.city && (
                  <p className="">
                    Weather in {info.city}: {info.temp}°C
                  </p>
                )}
                {info.icon ===
                "//cdn.weatherapi.com/weather/64x64/day/113.png" ? (
                  <WiDaySunny size={32} />
                ) : (
                  <WiDayFog size={32} />
                )}
                <span>
                  <WiHumidity /> Humidity: {info.humidity}%
                </span>
                <span>
                  <WiStrongWind /> Wind Speed: {info.wind_speed} kph
                </span>
                <span>
                  <WiDayFog /> Visibility: {info.visiblity} km
                </span>
                <span>
                  <WiBarometer /> Pressure: {info.pressure} mb
                </span>
                <span>
                  <WiCloud /> Condition: {info.condition}
                </span>
              </div>
            </div>

            {/* Weather forecast for three days */}
            {weatherForecastData.length > 0 && (
              <div className="mt-5 mx-4 d-flex flex-column">
                <div className="text-center">
                  Weather forecast for next 3 days
                </div>
                <div id="forecast-item" className="d-flex">
                  {weatherForecastData.map((forecast) => {
                    const key = uuidv4();
                    return (
                      <>
                        <div
                          key={key}
                          className="p-4 rounded-4 d-flex flex-column m-3"
                          style={{
                            border: "2px solid black",
                          }}
                        >
                          <p>Date: {forecast.date}</p>
                          {forecast.day.condition.icon ===
                          "//cdn.weatherapi.com/weather/64x64/day/113.png" ? (
                            <WiDaySunny size={32} />
                          ) : (
                            <WiDayFog size={32} />
                          )}
                          <p>Max Temp: {forecast.day.maxtemp_c}°C</p>
                          <p>Min Temp: {forecast.day.mintemp_c}°C</p>
                          <p>
                            <WiHumidity /> Humidity: {forecast.day.avghumidity}%
                          </p>
                          <p>
                            <WiStrongWind /> Wind Speed:{" "}
                            {forecast.day.maxwind_kph} kph
                          </p>
                          <p>
                            <WiDayFog /> Visibility: {forecast.day.avgvis_km} km
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <img src={loadingt} style={{width:'40px', height:'40px'}} className="bg-inherit" alt="" />
        </div>
      )}
    </>
  );
};

export default WeatherData;
