import { useEffect } from "react"
import { useAtom } from "jotai"

import "./styles/App.css"

import { fetchData } from "./helpers/fetchData"
import { campusDataAtom } from "./store"

import DebugView from "./components/layout/DebugView"
import Scene from "./components/render/Scene"
import Campus from "./components/render/Campus"

function App() {
  const [campusData, setCampusData] = useAtom(campusDataAtom)

  const url = "http://localhost:8000/api/campus"
  useEffect(() => {
    fetchData("GET", url).then((data) => setCampusData(data))
  }, [])

  return (
    <div className="App">
      <DebugView />
      <main>
        <aside className="aside input"></aside>
        <Scene>
          <Campus />
        </Scene>
        <aside className="aside output"></aside>
      </main>
    </div>
  )
}

export default App
