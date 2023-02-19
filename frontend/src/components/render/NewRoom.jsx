import { useEffect, useState, Suspense, useRef } from "react"
import { useGLTF, Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

import { useAtom, useAtomValue } from "jotai"
import { queryAtom, hoverRoomAtom, formResponseAtom } from "../../store"

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

  const [query, setQuery] = useAtom(queryAtom)
  const [hoverRoom, setHoverRoom] = useAtom(hoverRoomAtom)
  const [hover, setHover] = useState(false)
  const [highlightColor, setHighlightColor] = useState(false)
  const [formResponse, setFormResponse] = useAtom(formResponseAtom)

  function handleClick(e) {
    e.stopPropagation()

    setQuery({
      id: false,
      number: props.data.number,
      type: false,
    })
  }

  const meshRef = useRef()
  useFrame(() => {
    if (hoverRoom.room === props.data.number) {
      if (meshRef.current.position.y <= 10) {
        meshRef.current.position.y += 1
      }
    } else {
      meshRef.current.position.y = 0
    }
  })

  useEffect(() => {
    if (query.number) {
      query.number === props.data.number ? setHighlightColor(true) : setHighlightColor(false)
    }
    if (query.type) {
      query.type.toLowerCase() === props.data.type.toLowerCase() ? setHighlightColor(true) : setHighlightColor(false)
    }
    if (query.id) {
      if (formResponse.find((e) => e.roomId === props.data.roomId)) {
        setHighlightColor(true)
      } else {
        setHighlightColor(false)
      }
    }
  }, [query, highlightColor, formResponse])

  return (
    <group position={[x + width / 2, height / 2, y + depth / 2]}>
      {/* <Suspense fallback={null}>
        <mesh>
          <Model width={width} depth={depth} />
        </mesh>
      </Suspense> */}
      {/* {hoverRoom.room === props.data.number && (
        <Html
          style={{
            color: "black",
          }}
        >
          {props.data.number}
        </Html>
      )} */}
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
        ref={meshRef}
        // position={hoverRoom.room === props.data.number && [0, 10, 0]}
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          attach="material"
          color={highlightColor || hover ? "lime" : "white"}
          wireframe={query.number === props.data.number ? false : false}
        />
      </mesh>
    </group>
  )
}

export default NewRoom
