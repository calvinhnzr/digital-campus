import { useEffect, useState, useRef } from "react"

import styled from "styled-components"
import { useForm } from "react-hook-form"
import { useAtom } from "jotai"

import { hideFormAtom, formResponseAtom, formTypesAtom, formStatusAtom } from "../../../store"
import What from "./What"
import Where from "./Where"
import Which from "./Which"
import When from "./When"

const StyledFilter = styled.aside`
  background-color: rgb(239 239 239 / 95%);
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  grid-area: filter;
  justify-self: start;
  z-index: 100;
  border-radius: 6px;
  padding: 2rem;
  z-index: 2200;
  box-shadow: 5px 4px 14px rgba(0, 0, 0, 0.35);
  > * {
    color: black;
  }

  form {
    > div {
      margin-bottom: 2rem;
      outline: 1px solid red;
    }
    .disabled {
      cursor: not-allowed;
      opacity: 0.3;
      background-color: black;
    }
  }
`

const Form = () => {
  const [hideForm, setHideForm] = useAtom(hideFormAtom)
  const [formResponse, setFormResponse] = useAtom(formResponseAtom)
  const { register, handleSubmit, reset } = useForm()
  const [formTypes, setFormTypes] = useAtom(formTypesAtom)
  const [formStatus, setFormStatus] = useAtom(formStatusAtom)
  const [isDisabled, setIsDisabled] = useState(true)

  async function fetchQuery(params) {
    console.log("Params: ", params.toString())
    const url = "http://localhost:8000/api/campus/Gummersbach/rooms?" + params
    const response = await fetch(url)
    const data = await response.json()
    console.log("Response", data)
    setFormResponse(data)
  }

  async function onSubmit(query) {
    const { building, level, type, status, day, time } = query
    const params = new URLSearchParams({
      ...(building && { building }),
      ...(level && { level }),
      ...(type && { type }),
      ...(status && { status }),
      ...(day && status && { day }),
      ...(time && status && { time }),
    })
    query.asset && query.asset.forEach((asset) => params.append("asset", asset))
    params.toString() ? fetchQuery(params) : console.log("Fülle das Formular aus.")
  }

  function handleClick() {
    setIsDisabled(true)
    setFormStatus(false)
    setFormTypes(0)
    reset()
  }

  useEffect(() => {
    setIsDisabled(true)
    setFormStatus(false)
    setFormTypes(0)
    reset()
  }, [])

  useEffect(() => {
    !formStatus && !formTypes ? setIsDisabled(true) : setIsDisabled(false)
  }, [formStatus, formTypes])

  return (
    <StyledFilter>
      <label>
        <input type="button" onClick={() => setHideForm(!hideForm)} />
      </label>
      <form onSubmit={handleSubmit(onSubmit)}>
        <When register={register} />
        <p>{formTypes}</p>
        <What register={register} />
        <Where register={register} disabled={isDisabled ? "disabled" : ""}>
          <Which register={register} disabled={isDisabled ? "disabled" : ""} />
        </Where>
        <input type="submit" disabled={isDisabled ? "disabled" : ""} className={isDisabled ? "disabled" : ""} />
        <input type="button" onClick={() => handleClick()} value="reset" />
      </form>
    </StyledFilter>
  )
}

export default Form
