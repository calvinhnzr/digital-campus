import { Suspense } from "react"
import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Grid, PerspectiveCamera, OrthographicCamera, MapControls } from "@react-three/drei"

import { fetchData } from "./helpers/fetchData"

import "./styles/App.css"

import DebugView from "./components/layout/DebugView"
import NewBuilding from "./components/render/NewBuilding"
import NewFloor from "./components/render/NewFloor"
import NewRoom from "./components/render/NewRoom"

function App() {
  const [campusData, setCampusData] = useState(0)
  const [orthographicView, setOrthographicView] = useState(false)
  const [highlightRoom, setHighlightRoom] = useState("")

  const url = "http://localhost:8000/api/campus"
  useEffect(() => {
    fetchData("GET", url).then((data) => setCampusData(data))
  }, [])

  return (
    <div className="App">
      <DebugView>
        <label>
          Top Down / Orthographic View
          <input type="checkbox" onChange={() => setOrthographicView(!orthographicView)} checked={orthographicView} />
        </label>
        <label>
          Suche Raum{" "}
          <input
            type="text"
            placeholder="3217"
            onChange={(e) => setHighlightRoom(e.target.value)}
            value={highlightRoom}
          />
        </label>
      </DebugView>

      <Canvas>
        {!orthographicView ? (
          <>
            <OrbitControls maxDistance={300} />
            <PerspectiveCamera
              position={[-100, 120, 100]}
              rotation={[0, 0, 0]}
              fov={50}
              zoom={1}
              enabled={true}
              makeDefault
            />
          </>
        ) : (
          <>
            <MapControls rotation={[0, 0, 0]} enableRotate={false} minZoom={4} />
            <OrthographicCamera
              position={[0, 100, 0]}
              rotation={[0, Math.Pi / -2, 0]}
              zoom={4}
              enabled={true}
              makeDefault
            />
          </>
        )}

        {/* <Grid position={[0, 0, 0]} args={[120, 120, 1]} /> */}
        <axesHelper args={[50]} position={[0, 0, 0]} />

        <ambientLight opacoty={1} />
        <pointLight position={[50, 20, 20]} />

        {campusData ? (
          <group className="campus">
            {campusData[0].buildings.map((building) => (
              <NewBuilding key={building._id} data={building}>
                {building.floors.map((floor) => (
                  <NewFloor key={floor._id} data={floor}>
                    {floor.rooms.map((room) => (
                      <NewRoom key={room._id} data={room} highlightRoom={highlightRoom} />
                    ))}
                  </NewFloor>
                ))}
              </NewBuilding>
            ))}
          </group>
        ) : (
          ""
        )}
      </Canvas>
    </div>
  )
}

export default App
