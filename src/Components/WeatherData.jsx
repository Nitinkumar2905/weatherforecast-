import React, { useEffect, useState } from "react";
import {
  WiHumidity,
  WiStrongWind,
  WiDaySunny,
  WiDayFog,
  WiBarometer,
  WiCloud,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import "./Weather.css";
import { v4 as uuidv4 } from "uuid";
import loadingt from "./img/loadingt.gif";

const WeatherData = () => {
  const [info, setInfo] = useState({
    city: "",
  });
  const [weatherForecastData, setWeatherForecastData] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("");

  // Function to get the user's current location
  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation(`${latitude},${longitude}`);
          reverseGeocode(latitude, longitude); // Call reverse geocoding
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // Function to perform reverse geocoding
  const reverseGeocode = async (lat, lng) => {
    const apiKey = "f44286e5b232438aa5542d6c5d2b26e6"; // Replace with your API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (response.data.results.length > 0) {
        setLocationName(response.data.results[0].formatted_address);
        console.log(locationName)
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
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
        "X-RapidAPI-Key": "6df67ca40emsh54451cad843c528p17f8b9jsn4d9fa3d544e6",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setInfo({
        city:data.location.name
      })
      setWeatherForecastData(data.forecast.forecastday);
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
        <div className="d-flex flex-column align-items-center justify-content-center" style={{margin:'1rem 0rem' ,maxWidth:'100vw'}}>
          <div className="d-flex" id="search-bar">
            <h5 className="mx-2 my-2">Search location</h5>
            <input
              onChange={handleLocationChange}
              className="border-black px-2 py-0 rounded-2 border-2 mx-2"
              type="text"
              placeholder="location"
                value={location}
            />
          </div>

          <div className="d-flex mt-2" id="weather-output">
            {/* output */}

            {/* Weather forecast for three days */}
            {weatherForecastData.length > 0 && (
              <div className="d-flex flex-column"
              style={{margin:'2rem 0rem'}}>
                <h5 className="text-center">
                  Weather forecast for next 3 days
                </h5>
                <div id="forecast-item" className="d-flex">
                  {weatherForecastData.map((forecast) => {
                    const key = uuidv4();
                    return (
                      <>
                        <div
                          key={key}
                          className="bg-success p-4 rounded-4 d-flex flex-column m-3"
                          style={{
                            border: "2px solid black",
                          }}
                        >
                            <h5 className="mb-2 text-dark fw-bold">Location : {info.city}</h5>
                          <span>
                            <span className="fw-bold">Date:</span>{" "}
                            {forecast.date}
                          </span>
                          {forecast.day.condition.icon ===
                          "//cdn.weatherapi.com/weather/64x64/day/113.png" ? (
                            <WiDaySunny size={32} />
                          ) : (
                            <WiDayFog size={32} />
                          )}
                          <span className="mb-1">
                            {" "}
                            <span className="fw-bold">
                              {" "}
                              <WiCloud /> Condition:{" "}
                            </span>{" "}
                            {forecast.day.condition.text}
                          </span>
                          <span className="mb-1">
                            {" "}
                            <span className="fw-bold"> Max Temp: </span>{" "}
                            {forecast.day.maxtemp_c}°C
                          </span>
                          <span className="mb-1">
                            {" "}
                            <span className="fw-bold">Min Temp: </span>{" "}
                            {forecast.day.mintemp_c}°C
                          </span>
                          <span className="mb-1">
                            <WiHumidity />{" "}
                            <span className="fw-bold">Humidity: </span>{" "}
                            {forecast.day.avghumidity}%
                          </span>
                          <span className="mb-1">
                            <WiStrongWind />{" "}
                            <span className="fw-bold">Wind Speed:</span>
                            {forecast.day.maxwind_kph} kph
                          </span>
                          <span className="mb-1">
                            <WiDayFog />{" "}
                            <span className="fw-bold">Visibility: </span>{" "}
                            {forecast.day.avgvis_km} km
                          </span>
                          <span className="mb-1">
                            {" "}
                            <span className="fw-bold">
                              <WiSunset /> Sunset:{" "}
                            </span>{" "}
                            {forecast.astro.sunset}
                          </span>
                          <span className="mb-1">
                            {" "}
                            <span className="fw-bold">
                              {" "}
                              <WiSunrise /> Sunrise:{" "}
                            </span>{" "}
                            {forecast.astro.sunrise}
                          </span>
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
          <img
            src={loadingt}
            style={{ width: "40px", height: "40px" }}
            className="bg-inherit"
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default WeatherData;
