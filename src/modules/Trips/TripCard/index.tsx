import "./index.css"

interface ITripCardProps {
  coverImage: string;
  location: string;
  arrival: string;
  departure: string;
  selected: boolean;
  onClick?: () => void
}

export function TripCard({ coverImage, location, arrival, departure, selected, onClick }: ITripCardProps) {
  const isSelected = selected ? "trip-card_selected" : "";

  return (
    <div className={`trip-card ${isSelected}`} onClick={onClick} >
      <img className="trip-card__cover" src={ coverImage } alt="city" />
      <div className="trip-card__description">
        <h3>{ location }</h3>
        <p>{ arrival } - { departure }</p>
      </div>
    </div>
  )
}