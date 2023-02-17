import styled from "styled-components"
import { useState, useEffect } from "react"

const Label = styled.label``

const Asset = (props) => {
  const [checked, setChecked] = useState(false)

  return (
    <Label>
      <input type="checkbox" value={props.value._id} {...props.register("asset")} />
      {props.value.name}
    </Label>
  )
}

export default Asset
