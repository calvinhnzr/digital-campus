import { Children } from "react"

// Component calculate Size based on Children Props
// Must have <Floor /> as Child with all args
const Building = (props) => {
  let children = Children.toArray(props.children)
  // amount of <Floor /> inside <Building />
  let length = children.length

  let height = length ? getHighestLevel() * children[length - 1].props.height : 0
  let width = length ? children[length - 1].props.width : 0
  let depth = length ? children[length - 1].props.depth : 0

  function getHighestLevel() {
    let highestLevel = 0
    children.forEach((child) => {
      if (child.props.level > highestLevel) {
        highestLevel = child.props.level
      }
    })
    return highestLevel + 1
  }

  return (
    <group position={props.position}>
      {props.children}
      <mesh position={[width / 2, height / 2, depth / 2]} visible={true}>
        <boxGeometry attach="geometry" args={[width, height, depth]} />
        <meshStandardMaterial attach="material" color="white" wireframe={true} />
      </mesh>
    </group>
  )
}

export default Building
