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
        "X-RapidAPI-Key": "6df67ca40emsh54451cad843c528p17f8b9jsn4d9fa3d544e6",
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
        vis: data.current.vis_km,
        pressure: data.current.pressure_mb,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        uv: data.current.uv,
        wind_dir: data.current.wind_dir,
        date: data.current.last_updated,
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
              <h5 className="mx-4 mb-2 text-center ">Today's weather</h5>
              <div
                className="m-3 p-4 rounded-4 d-flex flex-column mx-auto bg-info text-dark"
                style={{
                  width: "fit-content",
                  border: "2px solid black",
                }}
              >
                {info.city && (
                  <span className="fw-bold mb-1">
                    Weather in {info.city}: {info.temp}°C
                  </span>
                )}
                <span className="mb-2">
                  <span className="fw-bold">Date:</span> {info.date}
                </span>
                {info.icon ===
                "//cdn.weatherapi.com/weather/64x64/day/113.png" ? (
                  <WiDaySunny size={32} />
                ) : (
                  <WiDayFog size={32} />
                )}
                <span className="mb-1">
                  <WiHumidity /> <span className="fw-bold"> Humidity:</span>{" "}
                  {info.humidity}%
                </span>
                <span className="mb-1">
                  <WiStrongWind /> <span className="fw-bold"> Wind Speed:</span>{" "}
                  {info.wind_speed} kph
                </span>
                <span className="mb-1">
                  <WiDayFog /> <span className="fw-bold"> Visibility:</span>{" "}
                  {info.vis} km
                </span>
                <span className="mb-1">
                  <WiBarometer /> <span className="fw-bold"> Pressure:</span>{" "}
                  {info.pressure} mb
                </span>
                <span className="mb-1">
                  <WiCloud /> <span className="fw-bold"> Condition:</span>{" "}
                  {info.condition}
                </span>
                <span className="mb-1">
                  {" "}
                  <span className="fw-bold"> Uv Rays risk :</span> {info.uv}/10
                </span>
                <span className="mb-1">
                  <WiStrongWind />{" "}
                  <span className="fw-bold">Wind direction:</span>
                  {info.wind_dir}
                </span>
              </div>
            </div>

            {/* Weather forecast for three days */}
            {weatherForecastData.length > 0 && (
              <div className="mt-5 mx-4 d-flex flex-column">
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
