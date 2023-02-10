import { useState } from "react"
import { useAtom } from "jotai"
import styled from "styled-components"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

import { selectedRoomTypeAtom } from "../../../store.jsx"

const Button = () => {}

const Container = styled.ul`
  display: flex;
  width: 100%;
  z-index: 100;
  padding: 0;
  margin: 0;
  list-style: none;
  gap: 1.5rem;
  align-items: center;
  /* outline: 1px solid red; */
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  }
  li {
    &.checked {
      /* text-decoration: underline; */
      /* padding: 0.3rem 0.6rem;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 6px; */

      label {
        font-weight: 700;
        color: #87ff87;
      }
    }
    label {
      color: #343434;
      color: white;
      font-weight: 400;
      cursor: pointer;

      &:hover {
        font-weight: 700;
      }
      &::before {
        display: block;
        content: attr(title);
        font-weight: 700;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }
      input {
        display: none;
      }
    }
  }
`

const RoomTypes = () => {
  let types = ["Büro", "Labor", "Verwaltung", "Hörsaal", "Seminaraum", "Projektraum"]

  let more = ["Toilette", "Aufzug", "Treppe", "Studienservice"]

  const [selectedRoomType, setSelectedRoomType] = useAtom(selectedRoomTypeAtom)

  return (
    <Container>
      {types.map((value, index) => {
        return (
          <li key={index} className={selectedRoomType === value ? "checked" : ""}>
            <label title={value}>
              {value}
              <input
                type="radio"
                name="selectedRoomType"
                value={value}
                checked={selectedRoomType === value}
                onChange={(e) => setSelectedRoomType(e.target.value)}
              />
            </label>
          </li>
        )
      })}
    </Container>
  )
}

export default RoomTypes
