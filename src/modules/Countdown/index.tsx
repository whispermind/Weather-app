import { useState, useEffect } from "react"

import { useGetWeather } from "../../hooks/useGetWeather";
import { useAppContext } from "../../app/context";
import { dayFormatter } from "../../services/dayFormatter";

import "./index.css";

let timer: NodeJS.Timer;

export function Countdown() {
  const [timestamp, setTimestamp] = useState(0);
  const { isLoaded, isError, weather } = useGetWeather();
  const { selected, trips } = useAppContext();

  const weatherData = weather?.days[0];

  useEffect(() => {
    const offset = - new Date().getTimezoneOffset() * 60 * 1000;
    const arrivalTimestamp = new Date(trips[selected].arrival).getTime();
    const intervalCb = () => {
      setTimestamp(arrivalTimestamp - Date.now() - offset);
      timer = setTimeout(intervalCb, delay);
    };
    const delay = 1000;
    
    timer = setTimeout(intervalCb, delay);

    return () => clearInterval(timer);
  });

  const days = Math.floor(timestamp / 86400000);
  const hours = Math.floor(timestamp % 86400000 / 3600000);
  const minutes = Math.floor(timestamp % 3600000 / 60000);
  const seconds = Math.floor(timestamp % 60000 / 1000);

  return (
    <>
      { isLoaded &&
        <div className="countdown">
          <div className="countdown__weather-description">
            <h3>{dayFormatter(weatherData?.datetime!)}</h3>
            <div className="countdown__weather-icon">
              <img src={`./assets/weathericons/svg/1st Set - Color/${weatherData?.icon}.svg`} alt="weather icon" />
              <span>{ weatherData?.feelslike }°C</span>
            </div>
            <div>{ weather?.adress }</div>
          </div>
          <div className="countdown__timer">
            <span className="countdown__days" data-caption="days">{ days }</span>
            <span className="countdown__hours" data-caption="hours">{ hours }</span>
            <span className="countdown__minutes" data-caption="minutes">{ minutes }</span>
            <span className="countdown__seconds" data-caption="seconds">{ seconds }</span>
          </div>
        </div> 
      }
      {
        isError && "ERROR MESSAGE, THERE COULD BE UR ADVERTISMENT"
      }
    </>
    )
}