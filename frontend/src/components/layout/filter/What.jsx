import { useState, useEffect } from "react"
import styled from "styled-components"
import { useAtom } from "jotai"
import { formTypesAtom, assetsDataAtom } from "../../../store"

const Label = styled.label`
  cursor: pointer;
  flex: 1 1 1;
  span {
    display: block;
    background-color: white;
    padding: 0.3rem 0.5rem;
    border-radius: 6px;
    font-size: 1rem;
  }

  input:checked + span {
    background-color: #1a1a1a;
    color: white;
  }

  input {
    display: none;
  }
`

const Asset = (props) => {
  const [formTypes, setFormTypes] = useAtom(formTypesAtom)

  function handleChange(e) {
    e.target.checked ? setFormTypes(formTypes + 1) : setFormTypes(formTypes - 1)
  }

  return (
    <Label>
      <input
        type="checkbox"
        value={props.value._id}
        {...props.register("asset", {
          onChange: (e) => {
            handleChange(e)
          },
        })}
      />
      <span>{props.value.name}</span>
    </Label>
  )
}

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-content: stretch;
`

const What = (props) => {
  const [assets, setAssets] = useAtom(assetsDataAtom)

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
    <section>
      <h3>Equipment</h3>
      <Div>
        {assets &&
          assets.map((value) => {
            return <Asset key={value._id} value={value} name="asset" register={props.register} />
          })}
      </Div>
    </section>
  )
}

export default What
