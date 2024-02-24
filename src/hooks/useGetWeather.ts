import { useEffect, useState } from "react"

import { useAppContext } from "../app/context";

export function useGetWeather(period: boolean) {
  const [isError, setError] = useState<Error | null>(null);
  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { selected, trips } = useAppContext();
  
  useEffect(() => {
    (async () => {
      const { location, arrival, departure } = trips[selected];
      if(period && (!arrival || !departure)) return
      const periodUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${arrival}/${departure}?unitGroup=metric&include=days&key=${process.env.REACT_APP_API_KEY}&contentType=json`;
      const todayUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&include=days&key=${process.env.REACT_APP_API_KEY}&contentType=json`;

      try {
        const response = await fetch(period ? periodUrl : todayUrl);
        const data = await response.json();
        setWeather(data);
        setIsLoaded(true);
      } catch(e) {
        e instanceof Error && setError(e);
      }
    })();
  }, [selected, period, trips]);

  return {
    isError,
    isLoaded,
    weather
  }
}