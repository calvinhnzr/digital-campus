import { OrbitControls, Grid, PerspectiveCamera, OrthographicCamera, MapControls } from "@react-three/drei"
import { useAtom } from "jotai"

import * as THREE from "three"

import { perspectiveAtom } from "../../store"

const Camera = () => {
  const [orthographicView] = useAtom(perspectiveAtom)
  return (
    <>
      {!orthographicView ? (
        <>
          <OrbitControls
            maxDistance={400}
            minDistance={100}
            mouseButtons={{
              LEFT: THREE.MOUSE.ROTATE,
              MIDDLE: THREE.MOUSE.DOLLY,
              RIGHT: THREE.MOUSE.PAN,
            }}
            enablePan={true}
          />
          <PerspectiveCamera
            position={[-240, 140, 60]}
            rotation={[0, 0, 0]}
            fov={40}
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
    </>
  )
}

export default Camera
