import React from "react"
import styled from "styled-components"

const StyledButton = styled.input`
  /* opacity: 0.5; */
  grid-area: button;

  border-radius: 6px;
  border: 1px solid transparent;
  padding: 0.6em 2em;
  width: fit-content;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  transition: border-color 0.25s;
`

const Button = () => {
  return <StyledButton type="button" value="Raum beitreten" />
}

export default Button
