import React from "react"
import { useAtom } from "jotai"
import { formStatusAtom } from "../../../store"

const When = (props) => {
  const [formStatus, setFormStatus] = useAtom(formStatusAtom)

  const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
  const d = new Date()
  let dayNum = d.getDay()

  function handleChange(e) {
    setFormStatus(e.target.checked)
  }

  return (
    <div>
      <h4>Verfügbarkeit</h4>
      <label>
        <input type="checkbox" {...props.register("status")} onChange={(e) => handleChange(e)} checked={formStatus} />
        Frei
      </label>
      <div className="date-time">
        <div className="day">
          <p>Wochentag</p>
          <select
            name="day"
            // defaultValue={days[dayNum - 1]}
            disabled={!formStatus ? "disabled" : ""}
            className={!formStatus ? "disabled" : ""}
            {...props.register("day")}
          >
            <option value="">-</option>
            {days.map((day, index) => {
              return (
                <option key={index + day} value={day}>
                  {day}
                </option>
              )
            })}
          </select>
        </div>
        <div className="time">
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
        </div>
      </div>
    </div>
  )
}

export default When
