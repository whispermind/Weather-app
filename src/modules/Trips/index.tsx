import { useMemo, useState, useCallback, FormEvent } from "react"

import { TripCard } from "./TripCard"
import { TripsForm } from "./TripsForm"
import { trips, covers } from "./mockedData"

import type { ITripsForm } from "./TripsForm"

import "./index.css"

export function Trips() {
  const [selected, setSelected] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  
  const cards = useMemo(() => 
  trips.map((cardData) => 
    <TripCard  key={cardData.id} {...cardData} selected={ cardData.id === selected } onClick={() => setSelected(cardData.id)} />),
  [selected]);

  const styles = {
    transform: `translateX(-${translateX}px)`
  }
  const cardWidth = 204;
  const sliderGap = 30;
  const cardsPerView = 3;

  const nextListener = useCallback(() => {
    if(translateX >= (trips.length - cardsPerView) * cardWidth) {
      return
    }
    setTranslateX(translateX + cardWidth + sliderGap);
  }, [translateX]);
  const prevListener = useCallback(() => {
    if(!translateX) {
      return
    }
    setTranslateX(translateX - cardWidth - sliderGap);
  }, [translateX]);

  const closeModal = useCallback(() => setModalOpen(false), []);
  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const { city: formCity, arrival: formArrival, departure: formDeparture } = e.target as typeof e.target & Record<keyof ITripsForm, { value: string }>; 
    const location = formCity.value as keyof typeof covers;
    const arrival = formArrival.value.split("").reverse().join("");
    const departure = formDeparture.value.split("").reverse().join("");

    trips.push({ location, arrival, departure, id: Math.random() * 100, coverImage: covers[location] });
    closeModal();
  }, [closeModal]);


  return (
    <>
      <div className="trips">
        <div className="trips__slider">
          <div className="trips__slider-overlay">
            <div className="trips__cards-container" style={styles}>
              { cards }
            </div>
          </div>
            <button className="trips__add-trip-button">Add trip</button>
        </div>
        <div className="trips__controls">
          <button className="trips__prev-button" onClick={prevListener}>prev</button>
          <button className="trips__next-button" onClick={nextListener}>next</button>
        </div>
      </div>
      <div className="trips__form-modal">
        <TripsForm onClose={closeModal} onSubmit={onSubmit} />
      </div>
    </>
  )
}