import { FormEvent, useState } from "react";

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
  const options = cities.map((city, index) => <option key={index}>{city}</option>);

  const currentDate = new Date();
  const currentDateFormatted = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

  return (
    <form className="trips-form" onSubmit={ onSubmit }>
      <label>
        City
        <select name="city" required>
          { options }
        </select>
      </label>
      <label>
        Arrival
        <input name="arrival" type="date" min={ currentDateFormatted } required />
      </label>
      <label>
        Departure
        <input name="departure" type="date" min={ currentDateFormatted } required />
      </label>
      <div className="trips-form__controls">
        <button onClick={ onClose } className="trips-form__close-button">X</button>
        <button type="submit" className="trips-form__submit-button">submit</button>
      </div>
    </form>
  )
}