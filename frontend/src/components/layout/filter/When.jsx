import React from "react"
import { useAtom } from "jotai"
import { formStatusAtom } from "../../../store"
import styled from "styled-components"

const Section = styled.section`
  display: grid;
  gap: 2rem 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "status status"
    "day time";
  padding: 0;
`

const Div = styled.div`
  p {
    margin-bottom: 0.5rem;
  }

  &.status {
    grid-area: status;

    label {
      display: flex;
      align-items: center;
    }
    input {
      margin: 0;
      margin-right: 0.75rem;
      height: 1.5rem;
      width: 1.5rem;
      border: none;
      outline: none;
      border-radius: 6px;
      background-color: white;
      color: #1a1a1a;
    }
  }
  &.day {
    grid-area: day;
    select {
      background-color: white;
      width: 100%;
      font-size: 1rem;
      padding: 0.75rem 0.5rem;
      border: none;
      border-right: 0.5rem solid transparent;
      border-radius: 6px;
      color: #1a1a1a;
    }
  }
  &.time {
    grid-area: time;
    input {
      width: 100%;
      padding: 0.75rem 0.5rem;
      border: none;
      background-color: white;
      border-radius: 6px;
      color: #1a1a1a;
    }
  }
`

const When = (props) => {
  const [formStatus, setFormStatus] = useAtom(formStatusAtom)

  const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
  const daysEn = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const d = new Date()
  let dayNum = d.getDay()

  function handleChange(e) {
    setFormStatus(e.target.checked)
  }

  return (
    <Section>
      <Div className="status">
        <h4>Verfügbarkeit</h4>
        <label>
          <input type="checkbox" {...props.register("status")} onChange={(e) => handleChange(e)} checked={formStatus} />
          Raum ist frei
        </label>
      </Div>
      <Div className="day">
        <p>Wochentag</p>
        <select
          name="day"
          // defaultValue={days[dayNum - 1]}
          disabled={!formStatus ? "disabled" : ""}
          className={!formStatus ? "disabled" : ""}
          {...props.register("day")}
        >
          <option value="">-</option>
          {daysEn.map((day, index) => {
            return (
              <option key={index + day} value={day.toLowerCase()}>
                {day}
              </option>
            )
          })}
        </select>
      </Div>
      <Div className="time">
        <label>
          <p>Uhrzeit (8:00 - 21:00)</p>
          <input
            type="time"
            min="08:00"
            max="21:00"
            {...props.register("time")}
            disabled={!formStatus ? "disabled" : ""}
            className={!formStatus ? "disabled" : ""}

            // value={new Date().toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" })}
          />
        </label>
      </Div>
    </Section>
  )
}

export default When
