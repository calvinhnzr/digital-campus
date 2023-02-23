import React from "react"
import styled from "styled-components"
import { useAtom } from "jotai"
import { hideFormAtom } from "../../store"
const Label = styled.label`
  display: none;
  input {
    display: none;
  }
  @media (max-width: 510px) {
    display: block;

    height: 100%;
    width: 100%;
    background-color: black;
    opacity: 0.6;
    position: fixed;
    z-index: 8000;
    cursor: pointer;
  }
`

const Blackout = () => {
  const [hideForm, setHideForm] = useAtom(hideFormAtom)
  return (
    <Label>
      <input type="button" onClick={() => setHideForm(true)} />
    </Label>
  )
}

export default Blackout
