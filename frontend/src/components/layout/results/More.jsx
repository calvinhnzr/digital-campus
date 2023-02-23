import { useState, useEffect } from "react"
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
    margin: 1rem 0;
  }
  grid-area: ${(props) => props.gridArea};
`

const More = (props) => {
  const [hidden, setHidden] = useState(props.open ? true : false)

  useEffect(() => {
    if (props.stundeplan && hidden === false && !props.image) {
      props.setImage(`${import.meta.env.VITE_DISPLAY_SERVICE_URL}/timetable/campus/Gummersbach/rooms/${props.number}`)
    }
  }, [hidden])

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
