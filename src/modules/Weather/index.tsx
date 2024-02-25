import { useMemo } from "react";

import { useGetWeather } from "../../hooks/useGetWeather"
import { dayFormatter } from "../../services/dayFormatter";

import "./index.css"

export function Weather() {
  const { isError, weather, isLoaded } = useGetWeather(true);
  const weatherList = useMemo(() => weather?.days.map(({ datetime, tempmax, tempmin, icon  }, index) => {
    return (
    <div key={index} className="trip-weather__day-caption">
      <div>{ dayFormatter(datetime) }</div>
      <img src={`./assets/weathericons/svg/1st Set - Color/${icon}.svg`} alt="weather icon" />
      <div>{`${tempmax}°C/${tempmin}°C`}</div>
    </div>)
  }), [weather]);

  return (
    <div className="trip-weather">
      <h2 className="trip-weather__heading">Week</h2>
      <div className="trip-weather__list">
        { isLoaded && weatherList }
        { isError && "FETCHING ERROR" }
      </div>
    </div>
  )
}