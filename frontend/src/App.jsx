import { Suspense } from "react"
import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import {
  OrbitControls,
  Grid,
  Plane,
  Html,
  PerspectiveCamera,
  OrthographicCamera,
  MapControls,
  useGLTF,
  Stage,
} from "@react-three/drei"

import { fetchData } from "./helpers/fetchData"
import mapData from "./assets/mapData.js"

import * as db from "./assets/db.json"

import DebugView from "./components/layout/DebugView"

import Building from "./components/render/Building"
import Floor from "./components/render/Floor"
import Room from "./components/render/Room"

import "./styles/App.css"

function App() {
  const globalFloorHeight = 2
  const [data, setData] = useState(0)
  const [orthographicView, setOrthographicView] = useState(false)
  const [searchRoom, setSearchRoom] = useState("")

  // const [state, setstate] = useState(initialState)

  let dbRooms
  const url = "http://localhost:8000/api/rooms"

  useEffect(() => {
    fetchData("GET", url).then((data) => setData(data))
    dbRooms = db.buildings[0].floors[0].rooms
    console.log(db.buildings[0].floors[0].rooms)
  }, [])

  return (
    <div className="App">
      <DebugView>
        {/* {data ? data.map((room) => <p key={room._id}>Room: {room.roomNo}</p>) : <p>Loading...</p>} */}
        <label>
          Top Down / Orthographic View
          <input type="checkbox" onChange={() => setOrthographicView(!orthographicView)} checked={orthographicView} />
        </label>
        <label>
          Suche Raum{" "}
          <input type="text" placeholder="3217" onChange={(e) => setSearchRoom(e.target.value)} value={searchRoom} />
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

        {/* <Grid position={[0, 0, 0]} args={[64, 64, 1]} /> */}
        {/* <axesHelper args={[50]} position={[0, 0, 0]} /> */}

        <ambientLight opacoty={1} />
        <pointLight position={[50, 20, 20]} />

        <group position={[-70, 0, 0]} className="world">
          <Building position={[0, 0, 0]} className="mensa">
            <Html>Mensa</Html>
            <Floor width={38} height={3} depth={38} level={-1} />
            <Floor width={38} height={3} depth={38} level={0} />
            <Floor width={38} height={3} depth={38} level={1} />
          </Building>

          <group position={[91, 0, 31]}>
            <Building position={[0, 0, 0]}>
              <Floor width={23} height={globalFloorHeight} depth={42} level={0} />
              <Floor width={23} height={globalFloorHeight} depth={42} level={1} />
              <Floor width={23} height={globalFloorHeight} depth={42} level={2} />
              <Floor width={23} height={globalFloorHeight} depth={42} level={3} />
            </Building>
            <Building position={[49, 0, 0]} className="bibliothek">
              <Html>Bibliothek</Html>
              <Floor width={23} height={globalFloorHeight} depth={42} level={0} />
              <Floor width={23} height={globalFloorHeight} depth={42} level={1} />
              <Floor width={23} height={globalFloorHeight} depth={42} level={2} />
              <Floor width={23} height={globalFloorHeight} depth={42} level={3} />
            </Building>
            <Building position={[102, 0, 0]} className="ferchau">
              <Html>Ferchau</Html>
              <Floor width={18} height={globalFloorHeight} depth={42} level={0} />
              <Floor width={18} height={globalFloorHeight} depth={42} level={1} />
              <Floor width={18} height={globalFloorHeight} depth={42} level={2} />
              <Floor width={18} height={globalFloorHeight} depth={42} level={3} />
            </Building>
          </group>

          <group position={[9, 0, -44]} className="hauptgebaude">
            <Building position={[0, 0, 0]} className="gebaudeA">
              <Html>Gebäude_A</Html>
              <Floor width={127} height={globalFloorHeight} depth={14} level={0} />
              <Floor width={127} height={globalFloorHeight} depth={14} level={1} />
              <Floor width={127} height={globalFloorHeight} depth={14} level={2} />
              <Floor width={127} height={globalFloorHeight} depth={14} level={3}>
                {/* {db ? (
                  db.buildings[0].floors[0].rooms.map((data, index) => <Room key={index} data={data} />)
                ) : (
                  <Html>{db.buildings[0].name}</Html>
                )} */}
                {mapData
                  ? mapData[0].rooms.map((data) => <Room searchRoom={searchRoom} key={data.id} data={data}></Room>)
                  : ""}
                {mapData ? mapData[0].floors.map((data) => <Room key={data.id} data={data} />) : ""}
              </Floor>
            </Building>
            <Building position={[92, 0, 14]}>
              <Floor width={20} height={globalFloorHeight} depth={15} level={0} />
              <Floor width={20} height={globalFloorHeight} depth={15} level={1} />
              <Floor width={20} height={globalFloorHeight} depth={15} level={2} />
              <Floor width={20} height={globalFloorHeight} depth={15} level={3} />
            </Building>
            <Building position={[82, 0, 29]} className="gebaudeB">
              <Html>Gebäude_B</Html>
              <Floor width={75} height={globalFloorHeight} depth={15} level={0} />
              <Floor width={75} height={globalFloorHeight} depth={15} level={1} />
              <Floor width={75} height={globalFloorHeight} depth={15} level={2} />
              <Floor width={75} height={globalFloorHeight} depth={15} level={3} />
            </Building>
          </group>
        </group>
      </Canvas>
    </div>
  )
}

export default App
