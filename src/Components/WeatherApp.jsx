import React, { useEffect, useState } from 'react';
import './WeatherApp.css'

// day
import clearday from "../Images/clearday.jpg";
import cloudyday from "../Images/cloudyday.jpg";
import hazyday from "../Images/hazyday.jpg";
import smokyday from "../Images/smokyday.jpg";
import rainyday from "../Images/rainyday.jpg";
import snowyday from "../Images/snowyday.jpg";
import stormyday from "../Images/stormyday.jpg";
import windyday from "../Images/windyday.jpg";
import mistyday from "../Images/mistyday.jpg";
// night
import clearnight from "../Images/clearnight.jpg";
import cloudynight from "../Images/cloudynight.jpg";
import hazynight from "../Images/hazynight.jpg";
import smokynight from "../Images/smokynight.jpg";
import rainynight from "../Images/rainynight.jpg";
import snowynight from "../Images/snowynight.jpg";
import stormynight from "../Images/stormynight.jpg";
import windynight from "../Images/windynight.jpg";
import mistynight from "../Images/mistynight.jpg"


const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState({});
    const [city, setCity] = useState("Karachi");
    const [cityKey, setCityKey] = useState("Karachi");
    const [weather, setWeather] = useState("");
    const [dayNight, setDayNight] = useState("");
    const [currentLocation, setCurrentLocation] = useState({});

    // console.log("data:", weatherData);
    // console.log("weather:",weather);

    useEffect(() => {
        function getLocation() {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        // console.log(position);
                        setCurrentLocation(position);
                        // console.log(currentLocation)
                        setCity("");
                    },
                    function (error) {
                        console.log("error", error);
                        setCityKey(city);
                    }
                );
            } else { alert("Geolocation is not supported by this browser.")}
        }
        getLocation();
    }, []);

    
        

    useEffect(() => {
        let searchQuery =
          currentLocation && currentLocation.coords
            ? `lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}`
            : `q=${cityKey ? cityKey : city}`;
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?${searchQuery}&appid={apiKey}=metric`)
        .then((res)=>res.json())
        .then((result)=>{
            setWeatherData(result) 
        })
        .catch((err)=>{
            console.log('err', err);
            
        })}, [cityKey]);

    

    const searchCity = (e) => {
        e.preventDefault();
        setCurrentLocation({});
        setCityKey(city);
        // console.log(cityKey);
        // setWeather(weatherData && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].main);


        // onClick={()=> setWeather(weatherData && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].main)}
    }
    
    useEffect(()=> setWeather(weatherData && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].main));

    
        const str = weatherData && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].icon;
        const dN = str&& str.slice(-1);
        // console.log(dN);
    
return (
        
        <div className="bg" style={{backgroundImage: `url(${
                weather === "Smoke" && dN === "d"? smokyday: 
                weather === "Smoke" && dN === "n"? smokynight: 
                weather === "Clouds" && dN === "d"? cloudyday:
                weather === "Clouds" && dN === "n"? cloudynight:
                weather === "Rain" && dN === "d"? rainyday:
                weather === "Rain" && dN === "n"? rainynight:
                weather === "Drizzle" && dN === "d"? rainyday:
                weather === "Drizzle" && dN === "n"? rainynight:
                weather === "Haze" && dN === "d"? hazyday:
                weather === "Haze" && dN === "n"? hazynight:
                weather === "Thunderstorm" && dN === "d"? stormyday:
                weather === "Thunderstorm" && dN === "n"? stormynight:
                weather === "Snow" && dN === "d"? snowyday:
                weather === "Snow" && dN === "n"? snowynight:
                weather === "Clear" && dN === "d"? clearday:
                weather === "Clear" && dN === "n"? clearnight:
                weather === "Wind" && dN === "d"? windyday:
                weather === "Wind" && dN === "n"? windynight:
                weather === "Dust" && dN === "d"? windyday:
                weather === "Dust" && dN === "n"? windynight:
                weather === "Mist" && dN === "d"? mistyday:
                weather === "Mist" && dN === "n"? mistynight:
                weather === "Fog" && dN === "d"? mistyday:
                weather === "Fog" && dN === "n"? mistynight: ""
                })`}}>
            
            <div className="container">
            
                <h1 id="heading">Weather App</h1>
                <form onSubmit={(e) => searchCity(e)}>
                <input type="text" autoFocus value={city} placeholder='Enter city name' onChange={(e)=>setCity(e.target.value)} />
                <button>Search</button>
                </form>
                
            
                <div className="detail">
                    
                    <h2>{weatherData && weatherData.name}, {weatherData && weatherData.sys && weatherData.sys.country}</h2>
                    <div className="row1">
                        <div className="row1-col1">
                            <img src={`http://openweathermap.org/img/wn/${weatherData && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].icon}@2x.png`} />
                            <p>{weatherData && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].main}</p>
                            <small>({weatherData && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].description})</small>
                            <p>Humidity: {weatherData && weatherData.main && weatherData.main.humidity}% </p>
                        </div>
                    
                        <div className='row1-col2'>
                            <h1>{Math.round(weatherData && weatherData.main && weatherData.main.temp)}°</h1>
                            <p>Feels like {Math.round(weatherData && weatherData.main && weatherData.main.feels_like)}°</p>
                            <p>Min. {Math.round(weatherData && weatherData.main && weatherData.main.temp_min)}°</p>
                            <p>Max. {Math.round(weatherData && weatherData.main && weatherData.main.temp_max)}°</p>
                        </div>
                    </div>

                    
                    
                    
                    
                    <small>Last updated:  {new Date(weatherData && weatherData.dt * 1000).toLocaleString("en-US", {day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric", timeZoneName: "short"})}</small> 
                </div>
            </div>
        </div>

);
}

export default WeatherApp;
