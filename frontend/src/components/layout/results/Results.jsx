import { useEffect } from "react"

import { useAtom } from "jotai"
import styled from "styled-components"
import Card from "./Card"

import { roomsDataAtom, queryAtom, selectedAtom, formResponseAtom } from "../../../store"

const Aside = styled.aside`
  /* outline: 1px solid red; */
  display: flex;
  flex-direction: column;
  position: absolute;
  position: fixed;
  /* position: relative; */
  /* right: 3rem; */
  right: 0;
  /* padding-right: 3rem; */
  height: auto;
  max-height: 100%;
  z-index: 1000;

  .scroll {
    padding: 7rem 0 2rem;
    padding-right: 3rem;
    display: flex;
    flex-direction: column;
    align-self: start;
    align-items: flex-end;
    justify-self: end;
    gap: 1rem;
    overflow-y: scroll;
  }

  /* &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  } */
  /* mobile */
  @media (max-width: 510px) {
    position: absolute;
    width: 100%;
    max-width: 100%;
    right: 0;
    bottom: 0;
    overflow-y: hidden;
    /* overflow-x: hidden; */
    position: fixed;
    .scroll {
      flex-direction: row;
      overflow-y: hidden;
      overflow-x: scroll;
      justify-self: start;
      gap: 1.5rem;
      /* justify-content: center; */
      padding: 1.5rem;
      /* width: 100%; */
      width: auto;

      /* height: 100%; */
      /* padding: ; */
      > * {
        /* outline: 1px solid blue; */
        width: calc(100vw - 5rem);
      }
    }
  }
`

const Results = (props) => {
  const [roomsData, setRoomsData] = useAtom(roomsDataAtom)
  const [query, setQuery] = useAtom(queryAtom)
  const [selected, setSelected] = useAtom(selectedAtom)
  const [formResponse, setFormResponse] = useAtom(formResponseAtom)

  const handleFetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setRoomsData(data)
  }

  function handleQuery() {
    let arr
    if (query.number) {
      arr = roomsData.filter((data) => query.number === data.number)
    }
    if (query.type) {
      arr = roomsData.filter((data) => query.type.toLowerCase() === data.type.toLowerCase())
    }
    if (query.id) {
      arr = formResponse
    }
    return arr
  }

  const url = `${import.meta.env.VITE_DATA_SERVICE_URL}/api/campus/Gummersbach/rooms`
  useEffect(() => {
    handleFetchData(url)
  }, [formResponse])

  return (
    <Aside>
      <div className="scroll">
        {(roomsData && query.number) || query.type || query.id
          ? handleQuery().map((data, index) => (
              <Card
                index={index}
                key={data.roomId}
                data={data}
                roomSocket={props.roomSocket}
                size={handleQuery().length}
              />
            ))
          : ""}
        {formResponse === "loading" && "Loading..."}
      </div>
    </Aside>
  )
}

export default Results
