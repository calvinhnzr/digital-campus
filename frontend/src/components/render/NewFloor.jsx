import { useEffect, useState } from "react"

const NewFloor = (props) => {
  let height = 2 // 4 x 2
  let width = props.data.coords.width
  let depth = props.data.coords.depth
  let level = props.data.level

  const [visible, setVisible] = useState(false)

  return (
    <group position={[0, height * level, 0]}>
      {props.children}
      <mesh position={[width / 2, height / 2, depth / 2]} visible={visible}>
        <boxGeometry attach="geometry" args={[width, height, depth]} />
        <meshStandardMaterial attach="material" color="#34c14e" wireframe={true} />
      </mesh>
    </group>
  )
}

export default NewFloor
