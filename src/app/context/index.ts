import { createContext, useContext } from 'react';

export const defaultAppContext = {
  trips: [
    { location: "Berlin", arrival: "2024-07-14", departure: "2024-07-21", coverImage: "./assets/cities/berlin.jpg" },
    { location: "Tokyo", arrival: "2024-07-17", departure: "2024-07-23", coverImage: "./assets/cities/tokyo.webp" },
    { location: "Barcelona", arrival: "2024-07-16", departure: "2024-07-26", coverImage: "./assets/cities/barcelona.jpg" },
    { location: "Barcelona", arrival: "2024-07-16", departure: "2024-07-26", coverImage: "./assets/cities/barcelona.jpg" }
  ],
  cities: ["berlin", "tokyo", "barcelona"],
  covers: { berlin:"./assets/cities/berlin.jpg", tokyo: "./assets/cities/tokyo.webp", barcelona: "./assets/cities/barcelona.jpg" },
  selected: 0
}

type TypeHelder = typeof defaultAppContext

export interface IAppContext extends TypeHelder {
  setContext?: (context: IAppContext) => void
}


export const AppContext = createContext<IAppContext>(defaultAppContext);
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};