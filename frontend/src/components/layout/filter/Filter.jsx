import React from "react"
import styled from "styled-components"
import Availibility from "./Availibility"

const StyledFilter = styled.form`
  background-color: rgb(239 239 239 / 95%);
  width: 340px;
  display: flex;
  flex-direction: column;
  position: absolute;
  grid-area: filter;
  justify-self: start;
  z-index: 100;
  /* outline: 1px solid red; */
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 5px 4px 14px rgba(0, 0, 0, 0.35);
  > * {
    color: black;
  }
`

const Filter = () => {
  return (
    <StyledFilter>
      <Availibility />
      <section>Raum Typ</section>
      <section>Equipment</section>
      <section>Raum Suchen</section>
    </StyledFilter>
  )
}

export default Filter
