import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { atom, useAtom } from "jotai"
import { OrbitControls, Grid, PerspectiveCamera, OrthographicCamera, MapControls } from "@react-three/drei"

import { perspectiveAtom } from "../../store"

const Scene = (props) => {
  const [orthographicView] = useAtom(perspectiveAtom)

  return (
    <Canvas
      gl={{
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
    >
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
      {props.children}
    </Canvas>
  )
}

export default Scene
