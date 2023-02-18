import React from "react"

const Where = (props) => {
  const levels = ["Erdgeschoss", "1. Etage", "2. Etage", "3. Etage"]
  return (
    <div className="section">
      <section>
        <h4>Gebäude</h4>
        <select {...props.register("building")} disabled={`${props.disabled}`} className={`${props.disabled}`}>
          <option value="">Alle</option>
          <option value="Gebäude A">Gebäude A</option>
          <option value="Gebäude B">Gebäude B</option>
        </select>
      </section>
      <section>
        <h4>Etage</h4>
        <select {...props.register("level")} disabled={`${props.disabled}`} className={`${props.disabled}`}>
          <option value="">Alle</option>
          {levels.map((level, index) => {
            return (
              <option key={level} value={index}>
                {level}
              </option>
            )
          })}
        </select>
      </section>
      {props.children}
    </div>
  )
}

export default Where
