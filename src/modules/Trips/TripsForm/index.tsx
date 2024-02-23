import { FormEvent, useReducer, useCallback, ChangeEvent } from "react";

import { TripsFormStateReducer, initialState, TAction } from "./reducer";
import { cities } from "../mockedData"

import "./index.css"

interface ITripsFormProps {
  onClose: () => void
  onSubmit: (data: FormEvent) => void
}

export interface ITripsForm {
  city: string;
  arrival: string;
  departure: string;
}

export function TripsForm({ onClose, onSubmit }: ITripsFormProps) {
  const [{ maxDepartureDate, minDepartureDate, maxArrivalDate, minArrivalDate, arrivalDate, departureDate }, dispatch] = useReducer(TripsFormStateReducer, initialState);

  const options = cities.map((city, index) => <option key={index}>{city}</option>);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target as typeof e.target & { value: string, name: string };
    const type = name as TAction["type"];
    dispatch({ type, value });
  }, []);

  return (
    <form className="trips-form" onSubmit={onSubmit}>
      <label>
        City
        <select name="city" required>
          {options}
        </select>
      </label>
      <label>
        Arrival
        <input name="arrival" onChange={onChange} value={arrivalDate} type="date" min={minArrivalDate} max={maxArrivalDate} required />
      </label>
      <label>
        Departure
        <input name="departure" onChange={onChange} value={departureDate} type="date" min={minDepartureDate} max={maxDepartureDate} required />
      </label>
      <div className="trips-form__controls">
        <button type="button" onClick={onClose} className="trips-form__close-button">X</button>
        <button type="submit" className="trips-form__submit-button">submit</button>
      </div>
    </form>
  )
}