/**
 * @param {number} width Floor Width
 * @param {number} height Global Floor Height
 * @param {number} depth Floor Depth
 */

// TODO: doent get height from props, instead from contextProvider
const Floor = (props) => {
  return (
    <group position={[0, props.height * props.level, 0]}>
      {props.children}
      <mesh position={[props.width / 2, props.height / 2, props.depth / 2]} visible={false}>
        <boxGeometry attach="geometry" args={[props.width, props.height, props.depth]} />
        <meshStandardMaterial attach="material" color="#34c14e" wireframe={true} />
      </mesh>
    </group>
  )
}

export default Floor
