import React from "react"
import styled from "styled-components"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

const Label = styled.label`
  overflow: hidden;
  position: absolute;
  top: 1.5rem;
  right: -6em;
  gap: 0.5rem;
  cursor: pointer;
  /* outline: 1px solid red; */
  transition: ease-in-out 0.1s;
  &:hover {
    transform: ${(props) => (props.hideForm ? " translate(0.5rem)" : " translate(-0.5rem)")};
  }
  span {
    display: flex;
    /* flex-direction: row-reverse; */
    align-items: center;

    color: white;
    font-size: 1rem;
    font-weight: 700;
  }
  svg {
    color: white;
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
      <span>
        {!props.hideForm ? <FiChevronLeft /> : <FiChevronRight />}
        Filter
      </span>
      <input type="button" onClick={() => props.setHideForm(!props.hideForm)} />
    </Label>
  )
}

export default Hide
