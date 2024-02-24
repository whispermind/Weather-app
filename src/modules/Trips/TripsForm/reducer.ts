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
  const dateGap = 15;
  const date = new Date(value);

  if(type === "arrival") {
    mutated.arrivalDate = value;
    mutated.minDepartureDate = value;
    date.setDate(date.getDate() + dateGap)
    mutated.maxDepartureDate = value;
  }

  if(type === "departure") {
    mutated.departureDate = value;
    mutated.maxArrivalDate = value;
    date.setDate(date.getDate() - dateGap)
    mutated.minArrivalDate = date.getTime() > Date.now() ? dateFormatter(date) : dateFormatter(new Date());
  }

  return mutated;
}