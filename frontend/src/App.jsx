import { useEffect, useState } from "react"

import "./styles/App.css"
import { useAtom } from "jotai"
import { campusDataAtom } from "./store"

import { Center } from "@react-three/drei"
import Main from "./components/layout/Main"
import Nav from "./components/layout/nav/Nav"

import Scene from "./components/render/Scene"
import Camera from "./components/render/Camera"
import Campus from "./components/render/Campus"
import Results from "./components/layout/results/Results"
import Filter from "./components/layout/filter/Filter"

function App() {
  const [campusData, setCampusData] = useAtom(campusDataAtom)

  const handleFetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setCampusData(data)
  }

  const url = "http://localhost:8000/api/campus"
  useEffect(() => {
    handleFetchData(url)
  }, [])

  return (
    <div className="App">
      <Nav />
      <Main>
        {/* <Filter /> */}
        <Results />
      </Main>
      <Scene>
        <Camera />
        <Center>
          <Campus campusData={campusData} />
        </Center>
      </Scene>
    </div>
  )
}

export default App
