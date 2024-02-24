declare interface WeatherApiResponse {
  adress: string;
  timezone: string;
  longtitude: number;
  latitude: number;
  queryCost: number;
  resolvedAdress: string;
  timezone: string;
  tzoffset: number;
  resolvedAdress: string;
  stations: {
    [key: string]: {
      distance: number;
      longtitude: number;
      latitude: number;
      useCount: number;
      contribution: number;
      id: string;
      name: string;
      quality: number;
    }
  }
  days: {
    cloudcover: number;
    conditions: string;
    datetime: string;
    datetimeEpoch: number;
    description: string; 
    dew: number;
    feelslike: number;
    feelslikemax: number; 
    feelslikemin: number; 
    humidity: number;
    icon: string;
    moonphase: number; 
    precip: number ;
    precipcover: number;
    precipprob: number;
    preciptype: string;
    pressure: number;
    snow: number;
    snowdepth: number;
    solarenergy: number;
    solarradiation: number; 
    source: string;
    stations: string[];
    sunrise: string;
    sunriseEpoch: number;
    sunset: string;
    sunsetEpoch: number;
    temp: number;
    tempmax: number;
    tempmin: number;
    uvindex: number;
    visibility: number;
    winddir: number;
    windgust: number;
    windspeed: number;
  }[]
}