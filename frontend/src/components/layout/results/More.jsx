import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import styled from "styled-components"

const StyledMore = styled.div`
  label {
    width: fit-content;
    cursor: pointer;
    display: flex;
    input {
      display: none;
    }
    svg {
      margin-left: 0.5rem;
    }
  }
  ul {
    margin: 1rem;
  }
  grid-area: ${(props) => props.gridArea};
`

const More = (props) => {
  const [hidden, setHidden] = useState(false)

  return (
    <StyledMore gridArea={props.gridArea}>
      <label onChange={() => setHidden(!hidden)}>
        {props.label}
        {!hidden ? <FaChevronDown /> : <FaChevronUp />}
        <input type="checkbox" />
      </label>
      {hidden ? <>{props.children}</> : ""}
    </StyledMore>
  )
}

export default More
