import React, { useEffect, useState } from "react";
import logo from "./img/icons8-forecast-30.png";
import './Navbar.css'

const Navbar = () => {
  const [liveLocation, setLiveLocation] = useState("");
  const [weatherData, setWeatherData] = useState([""]);
  const [loading, setLoading] = useState(true);
  // function to get live location
  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLiveLocation(
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

  const handleWeatherData = async () => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${liveLocation}&country=india&days=3`;
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
      setWeatherData({
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
      console.log(data.current);
      console.log("navbar");
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
    handleWeatherData();
  }, [liveLocation]);
  return (
    <>
      <nav
        className="d-flex justify-content-center"
      >
        <div
        className="d-flex align-items-center justify-content-between"
         style={{width:'50vw'}}
        id="main-nav"
        >
          <div className="align-items-center d-flex">
            <img src={logo} alt="" />
            <span
              className="text-primary"
            id="logo-text"
            >
              Weather forecast
            </span>
          </div>
          {/* weather current live location */}
          {!loading && (
            <div>
              <div className="d-flex  align-items-center justify-content-between" id="navbar-weather">
                <img style={{height:'40px', width:'40px'}} className="mx-2" src={weatherData.icon} alt="" />
                <div>
                  <span className="mx-2">{weatherData.city}</span>
                  <span className="mx-2">{weatherData.temp}°C</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
