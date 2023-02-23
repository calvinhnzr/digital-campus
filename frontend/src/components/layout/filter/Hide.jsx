import React from "react"
import styled from "styled-components"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { IoClose } from "react-icons/io5"

const Label = styled.label`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  cursor: pointer;
  transition: ease-in-out 0.1s;
  &:hover svg {
    color: #1a1a1a;
  }
  @media (max-width: 510px) {
  }

  svg {
    color: #858585;
    height: 2rem;
    width: 2rem;
  }
  input {
    display: none;
  }
`

const Hide = (props) => {
  return (
    <Label hideForm={props.hideForm}>
      <IoClose />
      <input type="button" onClick={() => props.setHideForm(true)} />
    </Label>
  )
}

export default Hide
