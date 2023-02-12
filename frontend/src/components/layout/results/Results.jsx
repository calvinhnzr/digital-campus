import { useEffect, Children } from "react"

import { atom, useAtom, useAtomValue } from "jotai"
import styled from "styled-components"
import Card from "./Card"

import { roomsDataAtom, queryAtom, selectedAtom } from "../../../store"


const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  grid-area: results;
  /* grid-column: 3 / 4;
  grid-row: 1 / 3; */
  padding: 2rem 0 2rem;
  justify-self: end;

  z-index: 90;
  align-self: start;

  gap: 1rem;
  /* outline: 1px solid red; */
  z-index: 100;
  /* overflow-y: scroll; */
  /* height: 100%; */

  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  }
`

const Results = ({ children }) => {
  const [roomsData, setRoomsData] = useAtom(roomsDataAtom)
  const [query, setQuery] = useAtom(queryAtom)
  const [selected, setSelected] = useAtom(selectedAtom)

  const handleFetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setRoomsData(data)
  }

  const url = "http://localhost:8000/api/campus/Gummersbach/rooms"
  useEffect(() => {
    handleFetchData(url)
  }, [])

  function handleQuery() {
    let arr

    if (query.number) {
      arr = roomsData.filter((data) => query.number === data.number)
    }
    if (query.type) {
      arr = roomsData.filter((data) => query.type === data.type)
    }

    return arr
    // let obj = {
    //   data: "",
    //   clicked: false,
    //   hover: false,
    // }
    // setSelected([...obj])
  }

  return (
    <Aside>
      {(roomsData && query.number) || query.type
        ? handleQuery().map((data, index) => <Card index={index} key={data._id} data={data} />)
        : ""}

    </Aside>
  )
}

export default Results
