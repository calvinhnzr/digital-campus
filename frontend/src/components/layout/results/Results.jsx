import { useEffect } from "react"

import { useAtom } from "jotai"
import styled from "styled-components"
import Card from "./Card"

import { roomsDataAtom, queryAtom, selectedAtom, formResponseAtom } from "../../../store"

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: auto;
  max-height: 100%;
  padding: 7rem 0 2rem;
  justify-self: end;
  overflow-y: scroll;
  z-index: 90;
  align-self: start;
  right: 3rem;
  gap: 1rem;
  z-index: 1000;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
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
      {(roomsData && query.number) || query.type || query.id
        ? handleQuery().map((data, index) => (
            <Card index={index} key={data._id} data={data} roomSocket={props.roomSocket} size={handleQuery().length} />
          ))
        : ""}
      {formResponse === "loading" && "Loading..."}
    </Aside>
  )
}

export default Results
