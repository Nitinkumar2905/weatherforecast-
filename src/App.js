import "./App.css";
import Navbar from "./Components/Navbar";
import WeatherData from "./Components/WeatherData";

function App() {
  return (
    <>
    <div className="bg-dark text-white">
      <Navbar />
      <WeatherData/>
    </div>
    </>
  );
}

export default App;
