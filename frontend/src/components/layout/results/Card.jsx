import { useState, useEffect, useRef, useLayoutEffect } from "react"
import styled from "styled-components"
import { useAtom } from "jotai"
import { FaFlask, FaChevronDown, FaChevronUp } from "react-icons/fa"
import { currentRoomAtom, newRoomAtom } from "../../../store"
import More from "./More"
import Button from "./Button"
import NewRoom from "../../render/NewRoom"

const StyledCard = styled.div`
  padding: 0 1.5rem;
  width: 360px;
  z-index: 90;
  background-color: #efefef;
  background-color: rgb(239 239 239 / 95%);
  box-shadow: 5px 4px 14px rgba(0, 0, 0, 0.35);
  border-radius: 6px;
  transition: ease-in-out 0.2s;
  opacity: ${(props) => (!props.open ? ".5" : "1")};
  > * {
    color: #343434;
  }

  &:hover {
    opacity: 1;
  }
`

const Header = styled.label`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  gap: 1rem;
  padding: 1.5rem 0;
  padding-bottom: ${(props) => (props.open ? "2rem" : "1.5rem")};

  z-index: 200;
  grid-template-areas:
    "name type"
    "number status";
  cursor: pointer;
  .name {
    grid-area: name;
    font-weight: 700;
    justify-self: start;
  }
  .type {
    grid-area: type;
    font-weight: 700;
    color: #4a92d4;
    justify-self: end;
    display: flex;
    text-transform: capitalize;

    svg {
      margin-left: 0.4rem;
      font-size: 1.1rem;
      height: 1rem;
      transform: scale(1.1);
    }
  }
  .number {
    grid-area: number;
    justify-self: start;
  }
  .status {
    grid-area: status;
    justify-self: end;
    display: flex;
    &::before {
      content: " ";
      display: block;
      height: 1rem;
      width: 1rem;
      background-color: #47da1b;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
    &.busy::before {
      background-color: #ea8e37;
    }
  }
`

const Body = styled.section`
  /* padding-top: 1rem; */
  padding: 1.5rem 0;
  display: grid;
  border-top: 1px solid #d9d9d9;
  flex-direction: column;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  gap: 1.5rem;
  z-index: 200;
  grid-template-areas:
    "button status"
    "ausstattung ausstattung"
    "stundenplan stundenplan";
  .ausstattung {
    grid-area: ausstattung;
    font-weight: 700;
    justify-self: start;
  }
  .stundenplan {
    grid-area: stundenplan;
    font-weight: 700;
    justify-self: start;
  }
`

const Card = (props) => {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)
  const [currentRoom, setcurrentRoom] = useAtom(currentRoomAtom)
  const [newRoom, setNewRoom] = useAtom(newRoomAtom)

  let url = `http://localhost:8002/api/count?room=${props.data.number}`

  const fetchRoomCount = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setCount(data.count)
  }

  useLayoutEffect(() => {
    props.index === 0 && setOpen(true)
  }, [])

  useLayoutEffect(() => {
    fetchRoomCount(url)
  }, [currentRoom, newRoom])

  return (
    <StyledCard open={open}>
      <Header open={open}>
        <input type="checkbox" style={{ display: "none" }} onChange={() => setOpen(!open)} />
        <h3 className="name">{props.data.name ? props.data.name : "{name}"}</h3>
        <h4 className="type">
          {props.data.type ? props.data.type : "{type}"} <FaFlask />
        </h4>
        <span className="number">{props.data.number ? props.data.number : "{number}"}</span>

        {count ? <p className="status busy">{count ? count : "loading"}</p> : <p className="status empty">frei</p>}
      </Header>

      {open && (
        <Body>
          <Button number={props.data.number} />
          <More label="Ausstattung" gridArea="ausstattung" data={props.data}>
            <ul>
              <li>Data</li>
            </ul>
          </More>
          <More label="Stundeplan" gridArea="stundenplan" data={props.data}>
            <ul>
              <li>Data</li>
            </ul>
          </More>
        </Body>
      )}
    </StyledCard>
  )
}

export default Card
