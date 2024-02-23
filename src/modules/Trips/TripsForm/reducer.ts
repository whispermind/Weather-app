import { dateFormatter } from "../../../services/dateFormatter";

export interface ITripsFormState {
  minArrivalDate: string,
  maxArrivalDate: string;
  minDepartureDate: string;
  maxDepartureDate: string,
  arrivalDate: string,
  departureDate: string
}

export type TAction = {
  type: "arrival" | "departure"
  value: string;
}


export const initialState = {
  minArrivalDate: dateFormatter(new Date()),
  maxArrivalDate: "",
  minDepartureDate: "",
  maxDepartureDate: "",
  arrivalDate: "",
  departureDate: ""
};

export function TripsFormStateReducer(state: ITripsFormState, { type, value }: TAction) {
  const mutated = structuredClone(state);
  const dateGap = 14;
  const date = new Date(value);
  const formatted = dateFormatter(date);

  if(type === "arrival") {
    
    mutated.arrivalDate = formatted;
    mutated.minDepartureDate = formatted
    date.setDate(date.getDate() + dateGap)
    mutated.maxDepartureDate = dateFormatter(date);
  }

  if(type === "departure") {
    mutated.departureDate = formatted;
    mutated.maxArrivalDate = formatted;
    date.setDate(date.getDate() - dateGap)
    mutated.minArrivalDate = date.getTime() > Date.now() ? dateFormatter(date) : dateFormatter(new Date());
  }

  return mutated;
}