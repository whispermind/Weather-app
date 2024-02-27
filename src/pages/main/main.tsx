import { Trips, Weather, Countdown } from "../../modules"

import "./index.css"

export function MainPage() {
  return (
    <>
      <main>
        <div className="main">
          <h1><span>weather</span> forecast</h1>
          <Trips />
          <Weather />
        </div>
      </main>
      <aside>
        <Countdown />
      </aside>
    </>
  )
}