import { useEffect, useState } from "react"
import { Html } from "@react-three/drei"

const NewBuilding = (props) => {
  let height = 8 // 4 x 2
  let width = props.data.coords.width
  let depth = props.data.coords.depth
  let x = props.data.coords.x
  let y = props.data.coords.y

  const [visible, setVisible] = useState(true)

  return (
    <group position={[x, 0, y]}>
      {props.children}
      {/* <Html className="fiberHtml">{props.data.name}</Html> */}
      <mesh position={[width / 2, height / 2, depth / 2]} visible={visible}>
        <boxGeometry attach="geometry" args={[width, height, depth]} />
        <meshStandardMaterial attach="material" color="white" wireframe={true} />
      </mesh>
    </group>
  )
}

export default NewBuilding
