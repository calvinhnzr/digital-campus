import React, { useState } from "react"
import styled from "styled-components"
import { useAtom, useSetAtom } from "jotai"
import { FaSearch } from "react-icons/fa"
import { HiMenuAlt2 } from "react-icons/hi"
import { queryAtom, hideFormAtom } from "../../../store"

const Div = styled.div`
  display: flex;
  background-color: white;
  box-shadow: 0px 3px 8px -1px rgba(0, 0, 0, 0.24);
  border-radius: 12px;
  padding-right: 0.5rem;
  min-width: 14rem;
  align-self: start;
  @media (max-width: 510px) {
    margin: 0 1.5rem;
    min-width: inherit;
    max-width: 12rem;
  }
`

const ButtonInput = styled.label`
  cursor: pointer;
  input {
    display: none;
  }
  svg {
    font-size: 2.75rem;
    transform: scale(0.5);
    color: rgb(239 239 239 / 95%);
    /* color: #858585; */
    color: ${(props) => (!props.hideForm ? "#1a1a1a" : "#858585")};
    transition: ease-in-out 0.2s;
  }
  &:hover svg {
    color: rgb(239 239 239 / 95%);
    color: #1a1a1a;
  }
`

const TextInput = styled.label`
  z-index: 100;
  display: flex;
  width: 100%;
  input {
    background-color: white;
    width: 100%;
    border: none;
    color: #1a1a1a;
    font-size: 1rem;
    &:focus {
      border: none;
      outline: none;
    }
  }
  svg {
    color: #858585;
    color: #1a1a1a;
    font-size: 2.75rem;
    transform: scale(0.5);
  }
`

const Search = () => {
  const [query, setQuery] = useAtom(queryAtom)
  const [hideForm, setHideForm] = useAtom(hideFormAtom)

  function handleChange(e) {
    setQuery({
      id: false,
      number: e.target.value,
      type: false,
    })
  }

  return (
    <Div>
      <ButtonInput hideForm={hideForm}>
        <input type="button" onClick={() => setHideForm(!hideForm)} />
        <HiMenuAlt2 />
      </ButtonInput>
      <TextInput>
        <input
          type="number"
          maxLength="4"
          placeholder="e.g. 3216"
          onChange={(e) => handleChange(e)}
          value={query.number ? query.number : ""}
        />
        <FaSearch />
      </TextInput>
    </Div>
  )
}

export default Search
