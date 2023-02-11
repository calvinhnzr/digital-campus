import { useEffect, useState, Suspense } from "react"
import { useGLTF, Html } from "@react-three/drei"
import { useAtom } from "jotai"
import { queryNumberAtom, roomsDataAtom } from "../../store"

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

  const [searchRoom] = useAtom(queryNumberAtom)
  const [roomsData, setRoomsData] = useAtom(roomsDataAtom)

  const [visible, setVisible] = useState(true)

  const [hover, setHover] = useState(false)

  const [hightColor, setHightColor] = useState(false)

  function handleClick(e) {
    // e.stopPropagation()
    // setRoomsData({ ...props.data })
    // console.log(roomsData)
  }

  useEffect(() => {
    roomsData.number === props.data.number ? setHightColor(true) : setHightColor(false)
  }, [roomsData.number])

  return (
    <group position={[x + width / 2, height / 2, y + depth / 2]} visible={visible}>
      {/* <Suspense fallback={null}>
        <mesh>
          <Model width={width} depth={depth} />
        </mesh>
      </Suspense> */}
      {roomsData.number === props.data.number ? (
        <Html
          color="black"
          position={[0, 4, 0]}
          style={{
            color: "#343434",
            background: "none",
            padding: "0 .2rem",
            borderRadius: "6px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {roomsData.number}
        </Html>
      ) : (
        ""
      )}
      <mesh
        onClick={(e) => handleClick(e)}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHover(false)
        }}
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          attach="material"
          color={hightColor || hover ? "lime" : "white"}
          wireframe={searchRoom === props.data.number ? false : false}
        />
      </mesh>
    </group>
  )
}

export default NewRoom
