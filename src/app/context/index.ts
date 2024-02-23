import { createContext, useContext } from 'react';

export const defaultAppContext = {
trips: [
  { location: "Berlin", arrival: "14.07.2023", departure: "21.07.2023", coverImage: "./assets/cities/berlin.jpg", id: 1 },
  { location: "Tokyo", arrival: "17.07.2023", departure: "23.07.2023", coverImage: "./assets/cities/tokyo.webp", id: 2 },
  { location: "Barcelona", arrival: "16.07.2023", departure: "26.07.2023", coverImage: "./assets/cities/barcelona.jpg", id: 3 },
  { location: "Barcelona", arrival: "16.07.2023", departure: "26.07.2023", coverImage: "./assets/cities/barcelona.jpg", id: 4 }
],
cities: ["berlin", "tokyo", "barcelona"],
covers: { berlin:"./assets/cities/berlin.jpg", tokyo: "./assets/cities/tokyo.webp", barcelona: "./assets/cities/barcelona.jpg" },
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