import { forwardRef } from "react";
import "./index.css"

interface ITripCardProps {
  coverImage: string;
  location: string;
  arrival: string;
  departure: string;
  selected: boolean;
  onClick?: () => void
}

export const TripCard = forwardRef<HTMLDivElement, ITripCardProps>(function({ coverImage, location, arrival, departure, selected, onClick }: ITripCardProps, ref) {
  const isSelected = selected ? "trip-card_selected" : "";

  const formattedArrival = new Date(arrival).toLocaleDateString("ru-RU");
  const formattedDeparture = new Date(departure).toLocaleDateString("ru-RU");

  return (
    <div ref={ref} className={`trip-card ${isSelected}`} onClick={onClick} >
      <img className="trip-card__cover" src={ coverImage } alt="city" />
      <div className="trip-card__description">
        <h3>{ location }</h3>
        <p>{ formattedArrival } - { formattedDeparture }</p>
      </div>
    </div>
  )
})