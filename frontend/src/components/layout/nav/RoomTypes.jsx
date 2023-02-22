import { useState } from "react"
import { useAtom } from "jotai"
import styled from "styled-components"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

import { queryAtom } from "../../../store.jsx"

const Container = styled.ul`
  display: flex;
  grid-template-columns: auto;
  z-index: 100;
  padding: 0;
  margin: 0;
  list-style: none;
  gap: 1.5rem;
  align-items: center;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  }
  li {
    &.checked {
      label {
        box-sizing: border-box;
        font-weight: 700;
        text-decoration: underline;
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
  let typesDe = ["Büro", "Labor", "Projektraum", "Hörsaal"]
  let typesEn = ["lab", "project", "lecture"]
  let moreDe = ["Service", "Sonstige", "WC"]
  let moreEn = ["office", "service", "WC", "misc"]

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
      {typesEn.map((value, index) => {
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
      <span>|</span>
      {moreEn.map((value, index) => {
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
