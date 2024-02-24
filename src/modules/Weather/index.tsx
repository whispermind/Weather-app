import { useGetWeather } from "../../hooks/useGetWeather"

import "./index.css"

export function Weather() {
  const { isError, weather, isLoaded } = useGetWeather(true);

  const weatherList = weather && weather.days.map(({ datetime, feelslikemax, feelslikemin, icon  }, index) => {
    return (
    <div key={index} className="trip-weather__day-caption">
      <div>{ new Date(datetime).toLocaleDateString("en-US", { weekday: "long" })}</div>
      <img src={`./assets/weathericons/svg/1st Set - Color/${icon}.svg`} alt="weather icon" />
      <div>{`${feelslikemax}°C/${feelslikemin}°C`}</div>
    </div>)
  });

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