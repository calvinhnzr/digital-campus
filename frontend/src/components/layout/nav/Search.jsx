import React, { useState } from "react"
import styled from "styled-components"
import { useAtom, useSetAtom } from "jotai"
import { FaSearch } from "react-icons/fa"
import { queryAtom } from "../../../store"

const Label = styled.label`
  z-index: 100;
  background-color: white;
  border-radius: 6px;
  height: 2.75rem;
  display: flex;
  color: red;
  width: 100%;
  box-shadow: 0px 3px 8px -1px rgba(0, 0, 0, 0.24);
  @media (min-width: 520px) {
    max-width: 14rem;
  }
  input {
    background-color: white;
    padding: 0 1rem;
    height: 2.75rem;
    width: 100%;
    border: none;
    border-radius: 6px;
    color: #343434;
    font-size: 1rem;

    &:focus {
      border: none;
      outline: none;
    }
  }

  svg {
    color: #343434;
    font-size: 2.75rem;
    transform: scale(0.5);
  }
`

const Search = () => {
  const [query, setQuery] = useAtom(queryAtom)

  function handleChange(e) {
    setQuery({
      id: false,
      number: e.target.value,
      type: false,
    })
  }

  return (
    <Label>
      <input
        type="text"
        maxLength="4"
        placeholder="e.g. 3216"
        onChange={(e) => handleChange(e)}
        value={query.number ? query.number : ""}
      />
      <FaSearch />
    </Label>
  )
}

export default Search
