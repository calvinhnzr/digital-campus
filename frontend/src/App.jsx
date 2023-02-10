import { useEffect, useState } from "react"

import "./styles/App.css"

import { fetchData } from "./helpers/fetchData"
import { Stats, PivotControls, Stage, Center } from "@react-three/drei"
import DebugView from "./components/layout/DebugView"
import Main from "./components/layout/Main"
import Nav from "./components/layout/nav/Nav"

import Scene from "./components/render/Scene"
import Camera from "./components/render/Camera"
import Campus from "./components/render/Campus"

function App() {
  const [campusData, setCampusData] = useState(0)

  const url = "http://localhost:8000/api/campus"
  useEffect(() => {
    fetchData("GET", url).then((data) => setCampusData(data))
  }, [])

  return (
    <div className="App">
      <Nav />
      <Main>
        <Scene>
          <Camera />
          <Center>
            <Campus campusData={campusData} />
          </Center>
        </Scene>
      </Main>
    </div>
  )
}

export default App
