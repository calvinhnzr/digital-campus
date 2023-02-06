import { useEffect, useState, Suspense } from "react"
import { useGLTF, Html } from "@react-three/drei"

function Room(props) {
  const [color, setColor] = useState("#34c14e")
  const [selected, setSelected] = useState(false)
  const [size, setSize] = useState(0)

  let width = props.data.coords.width
  let depth = props.data.coords.depth
  let height = 2

  let x = props.data.coords.x
  let y = props.data.coords.y

  function Model() {
    // const gltf = useGLTF(`/room${size}.gltf`, true)
    const gltf = useGLTF(`/room.gltf`, true)
    const model = gltf.scene.clone()
    return <primitive object={model} dispose={null} />
    // console.log(model)
  }

  function isRoomSearch() {
    if (props.searchRoom === props.data.id) {
      // console.log(true)
      return true
    } else {
      // console.log(false)
      return false
    }
  }

  useEffect(() => {
    // console.log(width)
    // console.log(props.data.coords)
    // if (width === 11 && depth === 7) {
    //   setSelected(true)
    //   setSize("11x7")
    // }
    // if (width === 3 && depth === 7) {
    //   setSelected(true)
    //   setSize("3x7")
    // }
    // if (width === 3 && depth === 4) {
    //   setSelected(true)
    //   setSize("3x4")
    // }
    // if (props.data.id[0] === "T") {
    //   // Stairs, Lift
    //   setColor("#e93535")
    // } else if (props.data.id[0] === "E") {
    //   // Floor
    //   setColor("#eeaf27")
    // } else {
    //   //Room
    //   setColor("#34c14e")
    // }
  }, [])

  props.data ? (
    <mesh>
      <boxGeometry args={[props.data.coords.width, 2, props.data.coords.depth]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  ) : (
    ""
  )

  // return (
  // <mesh>
  //   <boxGeometry args={[props.data.coords.width, props.data.coords.height, props.data.coords.depth]} />
  //   <meshStandardMaterial attach="material" color="white" />
  // </mesh>
  // <group position={[x + width / 2, height / 2, y + depth / 2]}>
  //   {selected ? (
  //     <Suspense fallback={null}>
  //       <mesh visible={false} position={[width / -2, height / -2, depth / -2]} rotation={[0, Math.PI / 2, 0]}>
  //         <Model />
  //       </mesh>
  //     </Suspense>
  //   ) : (
  //     ""
  //   )}
  //   <Suspense fallback={null}>
  //     <mesh visible={false} position={[width / -2, height / -2, depth / -2]} rotation={[0, Math.PI / 2, 0]}>
  //       <Model />
  //     </mesh>
  //   </Suspense>
  //   <mesh>
  //     <Html className="html">{props.data.id}</Html>
  //     <boxGeometry
  //       attach="geometry"
  //       args={[props.data.coords.width, props.data.coords.height, props.data.coords.depth]}
  //     />
  //     <meshStandardMaterial
  //       attach="material"
  //       color={selected ? "#fff046" : color}
  //       color={isRoomSearch ? "#fff046" : ""}
  //       wireframe={isRoomSearch() ? false : true}
  //       transparent
  //       opacity={isRoomSearch() ? 1 : 0.2}
  //     />
  //   </mesh>
  // </group>
  // )
}

export default Room
