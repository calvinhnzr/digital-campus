import { useEffect, useState, Suspense } from "react"
import { useGLTF, Html } from "@react-three/drei"

import { useAtom } from "jotai"
import { searchRoomAtom } from "../../store"

function Model(props) {
  const gltf = useGLTF(`/room.gltf`, true)
  const model = gltf.scene.clone()
  return <primitive object={model} dispose={null} />
}

const NewRoom = (props) => {
  let height = 2
  let width = props.data.coords.width
  let depth = props.data.coords.depth
  let x = props.data.coords.x
  let y = props.data.coords.y

  const [searchRoom] = useAtom(searchRoomAtom)

  const [visible, setVisible] = useState(true)

  return (
    <group position={[x + width / 2, height / 2, y + depth / 2]} visible={visible}>
      {/* <Suspense fallback={null}>
        <mesh>
          <Model width={width} depth={depth} />
        </mesh>
      </Suspense> */}
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          attach="material"
          color={searchRoom === props.data.number ? "lime" : "white"}
          wireframe={searchRoom === props.data.number ? false : false}
        />
      </mesh>
    </group>
  )
}

export default NewRoom
