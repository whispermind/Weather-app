import { useMemo, useState, useCallback, FormEvent, useRef, useEffect, ChangeEvent } from "react"

import { TripCard } from "./TripCard"
import { TripsForm } from "./TripsForm"
import { useAppContext } from "../../app/context"

import type { ITripsForm } from "./TripsForm"

import "./index.css"

export function Trips() {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  
  const context = useAppContext();
  const { trips, covers, setContext } = context;

  const ref = useRef<HTMLDivElement>(null);
  
  const cards = useMemo(() => {
  const filtered = filter ? trips.filter((trip) => trip.location.toLowerCase().startsWith(filter.toLowerCase())) : trips;
  return filtered.map((cardData) => {
    return <TripCard  ref={ref} key={cardData.id} {...cardData} selected={ cardData.id === selected } onClick={() => setSelected(cardData.id)} /> });
  },
  [selected, trips, filter]);

  const styles = {
    transform: `translateX(-${translateX}px)`
  }

  const sliderGap = 30;
  const cardsPerView = 3;

  const nextListener = useCallback(() => {
    if(translateX >= (trips.length - cardsPerView) * cardWidth) {
      return
    }
    setTranslateX(translateX + cardWidth + sliderGap);
  }, [translateX, cardWidth, trips.length]);
  const prevListener = useCallback(() => {
    if(!translateX) {
      return
    }
    setTranslateX(translateX - cardWidth - sliderGap);
  }, [translateX, cardWidth]);

  const calculateRectWidth = useCallback(() => {
    setCardWidth(ref.current?.getBoundingClientRect().width || 0);
  }, []);

  const onFilter = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => setFilter(target.value), []);

  const closeModal = useCallback(() => setModalOpen(false), []);
  const openModal = useCallback(() => setModalOpen(true), []);
  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const { city: formCity, arrival: formArrival, departure: formDeparture } = e.target as typeof e.target & Record<keyof ITripsForm, { value: string }>; 
    const location = formCity.value as keyof typeof covers;
    const arrival = new Date(formArrival.value).toLocaleDateString("ru-RU");
    const departure = new Date(formDeparture.value).toLocaleDateString("ru-RU");
    const trip = { location, arrival, departure, id: Math.random() * 100, coverImage: covers[location] };

    setContext && setContext({...context, trips: [...context.trips, trip]})
    closeModal();
  }, [closeModal, covers, setContext, context]);

  const modalHidden = modalOpen ? "" : "trips__form-modal_hidden";

  useEffect(() => {
    window.addEventListener("resize", calculateRectWidth);
    calculateRectWidth();
    return () => window.removeEventListener("resize", calculateRectWidth);
  }, [calculateRectWidth]);

  return (
    <>
      <div className="trips">
        <input onChange={onFilter} className="trips__filter" placeholder="filter" type="search" value={filter}  />
        <div className="trips__slider">
          <div className="trips__slider-overlay">
            <div className="trips__cards-container" style={styles}>
              { cards }
            </div>
          </div>
            <button onClick={openModal} className="trips__add-trip-button">Add trip</button>
        </div>
        <div className="trips__controls">
          <button className="trips__prev-button" onClick={prevListener}>prev</button>
          <button className="trips__next-button" onClick={nextListener}>next</button>
        </div>
      </div>
      <div className={`trips__form-modal ${modalHidden}`}>
        <TripsForm onClose={closeModal} onSubmit={onSubmit} />
      </div>
    </>
  )
}