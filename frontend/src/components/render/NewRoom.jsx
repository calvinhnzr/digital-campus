import { useEffect, useState, Suspense } from "react"
import { useGLTF, Html } from "@react-three/drei"
import { useAtom, useAtomValue } from "jotai"
import { queryAtom } from "../../store"

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

  const [hover, setHover] = useState(false)
  const [highlightColor, setHighlightColor] = useState(false)

  function handleClick(e) {
    e.stopPropagation()

    setQuery({
      id: false,
      number: props.data.number,
      type: false,
    })
  }

  useEffect(() => {
    if (query.number) {
      query.number === props.data.number ? setHighlightColor(true) : setHighlightColor(false)
    }
    if (query.type) {
      query.type === props.data.type ? setHighlightColor(true) : setHighlightColor(false)
    }
  }, [query, highlightColor])

  return (
    <group position={[x + width / 2, height / 2, y + depth / 2]}>
      {/* <Suspense fallback={null}>
        <mesh>
          <Model width={width} depth={depth} />
        </mesh>
      </Suspense> */}

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
          color={highlightColor || hover ? "lime" : "white"}
          wireframe={query.number === props.data.number ? false : false}
        />
      </mesh>
    </group>
  )
}

export default NewRoom
