import { useState, useEffect, useRef, useLayoutEffect } from "react"
import styled from "styled-components"
import { useAtom } from "jotai"

import { FaFlask, FaRestroom, FaPaperPlane, FaBookOpen } from "react-icons/fa"
import { MdInfo, MdSettings } from "react-icons/md"
import { BsPersonFill } from "react-icons/bs"

import { queryAtom, hoverRoomAtom, assetsDataAtom } from "../../../store"
import More from "./More"
import Button from "./Button"

const StyledCard = styled.div`
  padding: 0 1.5rem;
  width: 360px;
  z-index: 90;
  background-color: #efefef;
  background-color: rgb(239 239 239 / 95%);
  box-shadow: 5px 4px 14px rgba(0, 0, 0, 0.35);
  border-radius: 12px;
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
  padding-bottom: ${(props) => (props.open && props.expand ? "2rem" : "1.5rem")};

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

    justify-self: end;
    display: flex;
    text-transform: capitalize;
    &.lab {
      color: #4a92d4;
    }
    &.project {
      color: #ecaf45;
    }
    &.lecture {
      color: #72c454;
    }

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
  padding-bottom: 1.5rem;
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
  .timetable {
    margin-top: 1rem;
    width: 100%;
  }

  .assets {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-content: stretch;
    li {
      display: block;
      background-color: #1a1a1a;
      color: white;
      background-color: white;
      color: #1a1a1a;

      padding: 0.3rem 0.5rem;
      border-radius: 6px;
      font-size: 1rem;
    }
  }
`

const Card = (props) => {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)
  const [query, setQuery] = useAtom(queryAtom)
  const [hoverRoom, setHoverRoom] = useAtom(hoverRoomAtom)
  const [expand, setExpand] = useState(false)
  const [assets, setAssets] = useAtom(assetsDataAtom)
  const [image, setImage] = useState("")

  let url = `${import.meta.env.VITE_AUTH_SERVICE_URL}/api/count?room=${props.data.number}`

  async function fetchRoomCount(url) {
    const response = await fetch(url)
    const data = await response.json()
    setCount(data.count)
  }

  function handleClick() {
    setOpen(!open)
  }

  function handleMouseOver(number) {
    setHoverRoom({
      room: number,
    })
  }

  useEffect(() => {
    props.roomSocket.on(`room_${props.data.number}_updated`, (count) => {
      setCount(count)
    })
    return () => {
      props.roomSocket.off(`room_${props.data.number}_updated`)
    }
  }, [props.roomSocket])

  useLayoutEffect(() => {
    fetchRoomCount(url)
    ;(props.data.type.toLowerCase() === "lab" ||
      props.data.type.toLowerCase() === "lecture" ||
      props.data.type.toLowerCase() === "project") &&
      setExpand(true)
  }, [])

  useLayoutEffect(() => {
    props.index === 0 && props.size === 1 ? setOpen(true) : setOpen(false)
  }, [query.number])

  return (
    <StyledCard open={open}>
      <Header
        open={open}
        expand={expand}
        onMouseOver={() => handleMouseOver(props.data.number)}
        onMouseOut={() => setHoverRoom({ room: "" })}
      >
        <input type="button" style={{ display: "none" }} onClick={handleClick} />
        <h3 className="name">{props.data.name ? props.data.name : "{name}"}</h3>
        <h4 className={`type ${props.data.type.toLowerCase()}`}>
          {props.data.type ? <span>{props.data.type}</span> : "{type}"}
          {props.data.type.toLowerCase() === "office" && <BsPersonFill />}
          {props.data.type.toLowerCase() === "lab" && <FaFlask />}
          {props.data.type.toLowerCase() === "project" && <FaPaperPlane />}
          {props.data.type.toLowerCase() === "service" && <MdInfo />}
          {props.data.type.toLowerCase() === "lecture" && <FaBookOpen />}
          {props.data.type.toLowerCase() === "wc" && <FaRestroom />}
          {props.data.type.toLowerCase() === "misc" && <MdSettings />}
        </h4>
        <span className="number">{props.data.number ? props.data.number : "{number}"}</span>
        {expand &&
          (count ? <p className="status busy">{count ? count : "loading"}</p> : <p className="status empty">frei</p>)}
      </Header>

      {open && expand && (
        <Body>
          <Button number={props.data.number} />
          <More label="Ausstattung" gridArea="ausstattung" data={props.data}>
            <ul className="assets">
              {props.data.assets.length ? (
                props.data.assets.map((asset) => <li key={asset.id}>{asset.name}</li>)
              ) : (
                <li>Assets</li>
              )}
            </ul>
          </More>
          <More
            label="Stundeplan"
            gridArea="stundenplan"
            data={props.data}
            stundeplan={true}
            number={props.data.number}
            image={image}
            setImage={setImage}
          >
            <a href={image} rel="noreferrer noopener" target="_blank">
              <img src={image} className="timetable" alt={`Stundenplan für Raum ${props.data.number}`} />
            </a>
          </More>
        </Body>
      )}
    </StyledCard>
  )
}

export default Card
