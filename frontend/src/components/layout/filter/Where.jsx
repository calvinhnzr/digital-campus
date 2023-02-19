import React from "react"
import styled from "styled-components"

const Section = styled.section`
  display: grid;
  gap: 2rem 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "building level"
    "type type";
`

const Div = styled.div`
  /* outline: 1px solid red; */
  select {
    width: 100%;
    border-radius: 6px;
    background-color: white;
    color: black;
    border: none;
    padding: 0.75rem 0.5rem;
    border-right: 0.5rem solid transparent;
    font-size: 1rem;
  }
  &.building {
    grid-area: building;
  }
  &.level {
    grid-area: level;
  }
  &.type {
    grid-area: type;
  }
`

const Which = (props) => {
  const types = ["Lab", "Project", "Lecture"]
  return (
    <Div className="type">
      <h4>Raumtyp</h4>
      <select {...props.register("type")} disabled={`${props.disabled}`} className={`${props.disabled}`}>
        <option value="">Alle</option>
        {types.map((roomType, index) => {
          return (
            <option key={index + roomType} value={roomType.toLowerCase()}>
              {roomType}
            </option>
          )
        })}
      </select>
    </Div>
  )
}

const Where = (props) => {
  const levels = ["Erdgeschoss", "1. Etage", "2. Etage", "3. Etage"]
  return (
    <Section>
      <Div className="building">
        <h4>Gebäude</h4>
        <select {...props.register("building")} disabled={`${props.disabled}`} className={`${props.disabled}`}>
          <option value="">Alle</option>
          <option value="Gebäude A">Gebäude A</option>
          <option value="Gebäude B">Gebäude B</option>
        </select>
      </Div>
      <Div className="level">
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
      </Div>
      <Which register={props.register} disabled={`${props.disabled}`} />
    </Section>
  )
}

export default Where
