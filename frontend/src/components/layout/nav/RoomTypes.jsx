import { useState } from "react"
import { useAtom } from "jotai"
import styled from "styled-components"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

import { queryAtom } from "../../../store.jsx"

const Button = () => {}

const Container = styled.ul`
  display: flex;
  grid-template-columns: auto;
  z-index: 100;
  padding: 0;
  margin: 0;
  list-style: none;
  gap: 1.5rem;
  /* height: fit-content; */
  align-items: center;
  /* outline: 1px solid red; */
  overflow-x: scroll;
  /* &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  } */
  li {
    &.checked {
      /* text-decoration: underline; */
      /* padding: 0.3rem 0.6rem;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 6px; */

      label {
        box-sizing: border-box;
        font-weight: 700;
        color: #87ff87;
      }
    }
    label {
      color: #343434;
      color: white;
      font-weight: 400;
      cursor: pointer;

      text-transform: capitalize !important;
      &:hover {
        font-weight: 700;
      }
      input {
        display: none;
      }
    }
  }
`

const RoomTypes = () => {
  let types = ["büro", "labor", "verwaltung", "hörsaal", "seminaraum", "projektraum"]
  let more = ["Toilette", "Aufzug", "Treppe", "Studienservice"]

  const [query, setQuery] = useAtom(queryAtom)

  function handleChange(e) {
    setQuery({
      id: false,
      number: false,
      type: e.target.value,
    })
  }

  return (
    <Container>
      {types.map((value, index) => {
        return (
          <li key={index} className={query.type === value ? "checked" : ""}>
            <label title={value}>
              {value}
              <input
                type="radio"
                name="queryRoomType"
                value={value}
                checked={query.type === value}
                onChange={(e) => handleChange(e)}
              />
            </label>
          </li>
        )
      })}
    </Container>
  )
}

export default RoomTypes
