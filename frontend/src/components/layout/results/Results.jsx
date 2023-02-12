import { useEffect } from "react"

import { atom, useAtom, useAtomValue } from "jotai"
import styled from "styled-components"
import Card from "./Card"
import { roomsDataAtom, queryAtom } from "../../../store"

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  grid-area: results;
  justify-self: end;
  z-index: 100;
  gap: 1rem;
  /* outline: 1px solid red; */
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  }
`

const Results = () => {
  const [roomsData, setRoomsData] = useAtom(roomsDataAtom)

  const [query, setQuery] = useAtom(queryAtom)

  const handleFetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setRoomsData(data)
  }

  const url = "http://localhost:8000/api/campus/Gummersbach/rooms"
  useEffect(() => {
    handleFetchData(url)
  }, [])

  return (
    <Aside>
      {roomsData &&
        roomsData.map((data) => {
          if (query.number === data.number && query.number) return <Card key={data._id} data={data} />
          if (query.type === data.type && query.type) return <Card key={data._id} data={data} />
        })}
    </Aside>
  )
}

export default Results
