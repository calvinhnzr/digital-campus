import { useEffect } from "react"

import { atom, useAtom, useAtomValue } from "jotai"
import styled from "styled-components"
import Card from "./Card"
import { roomsDataAtom, queryNumberAtom, queryTypeAtom, resultsQueryAtom } from "../../../store"

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  position: absolute;
  grid-area: results;
  justify-self: end;
  z-index: 100;
  /* outline: 1px solid red; */
`

const Results = () => {
  const [roomsData, setRoomsData] = useAtom(roomsDataAtom)
  const results = useAtomValue(resultsQueryAtom)

  useEffect(() => {}, [])

  return (
    <Aside>
      {/* <Card data={roomsData} /> */}
      {results ? results.map((data, index) => <Card data={data} />) : ""}
    </Aside>
  )
}

export default Results
