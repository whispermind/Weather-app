import { createContext, useContext } from 'react';

export const defaultAppContext = {
  trips: [
    { location: "Berlin", arrival: "2023-07-14", departure: "2023-07-21", coverImage: "./assets/cities/berlin.jpg", id: 1 },
    { location: "Tokyo", arrival: "2023-07-17", departure: "2023-07-23", coverImage: "./assets/cities/tokyo.webp", id: 2 },
    { location: "Barcelona", arrival: "2023-07-16", departure: "2023-07-26", coverImage: "./assets/cities/barcelona.jpg", id: 3 },
    { location: "Barcelona", arrival: "2023-07-16", departure: "2023-07-26", coverImage: "./assets/cities/barcelona.jpg", id: 4 }
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