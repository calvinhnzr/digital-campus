import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { useAtom } from "jotai"
import { Stats, PivotControls, Stage } from "@react-three/drei"
import { perspectiveAtom } from "../../store"

const Scene = (props) => {
  const [orthographicView] = useAtom(perspectiveAtom)
  const boxRef = useRef(0)

  return (
    <Canvas
    // gl={{
    //   powerPreference: "high-performance",
    // }}
    // dpr={[1, 2]}
    >
      {/* <Stats /> */}
      {/* <Grid position={[0, 0, 0]} args={[120, 120, 1]} /> */}
      {/* <axesHelper args={[50]} position={[0, 0, 0]} /> */}
      <ambientLight opacoty={1} />
      <pointLight position={[50, 20, 20]} />
      {props.children}
    </Canvas>
  )
}

export default Scene
