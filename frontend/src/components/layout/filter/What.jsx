import { useState, useEffect } from "react"
import { useAtom } from "jotai"

import styled from "styled-components"
import { formTypesAtom } from "../../../store"

const Label = styled.label``

const Asset = (props) => {
  const [formTypes, setFormTypes] = useAtom(formTypesAtom)

  function handleChange(e) {
    e.target.checked ? setFormTypes(formTypes + 1) : setFormTypes(formTypes - 1)
  }

  return (
    <Label>
      <input type="checkbox" value={props.value._id} {...props.register("asset")} onChange={(e) => handleChange(e)} />
      {props.value.name}
    </Label>
  )
}

const What = (props) => {
  const [assets, setAssets] = useState()

  async function handleFetchAssets() {
    const url = "http://localhost:8000/api/assets"
    const response = await fetch(url)
    const data = await response.json()
    setAssets(data)
  }

  useEffect(() => {
    handleFetchAssets()
  }, [])

  return (
    <div>
      <h4>Equipment</h4>
      <div>
        {assets &&
          assets.map((value) => {
            return <Asset key={value._id} value={value} register={props.register} />
          })}
      </div>
    </div>
  )
}

export default What
