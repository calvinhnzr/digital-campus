import { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import { useAtom } from "jotai"

import { hideFormAtom, formResponseAtom, formTypesAtom, formStatusAtom, queryAtom, roomsDataAtom } from "../../../store"
import What from "./What"
import Where from "./Where"
import When from "./When"
import Hide from "./Hide"

const StyledFilter = styled.aside`
  grid-area: filter;
  z-index: 2200;
  margin: 0 0 2rem 3rem;
  width: 432px;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 6px;
  transition: ease-in-out 0.3s;
  transform: ${(props) => (props.hideForm ? "translate(calc(-400px - 3rem))" : "")};
  opacity: ${(props) => (props.hideForm ? "0.3" : "")};

  .scroll {
    overflow-y: scroll;
    /* display: none; */
    overflow-y: ${(props) => (props.hideForm ? "hidden" : "scroll")};
    padding: 2rem;
    border-radius: 6px;
    background-color: rgb(239 239 239 / 95%);
    box-shadow: 5px 4px 14px rgba(0, 0, 0, 0.35);
  }

  > * {
    color: black;
  }
  h2 {
    font-size: 1.3rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
  }

  form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.3rem;

    h3,
    h4 {
      font-weight: 700;
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    hr {
      display: block;
      width: 100%;
      border: 0.7px solid #d9d9d9;
    }

    section {
      /* border-bottom: 1px solid #d9d9d9;
      padding-bottom: 1.5rem;
      margin: 1rem 0 2rem; */
      /* outline: 1px solid red; */
    }
    .buttons {
      display: flex;
      gap: 1rem;
      align-items: stretch;
      input {
        flex: 1;
        padding: 0.75rem 0.5rem;
        font-size: 1rem;
        border: none;
        border-radius: 6px;
        background-color: white;
        cursor: pointer;
        color: #1a1a1a;
        /* font-weight: 700; */

        &[type="submit"] {
          background-color: #1a1a1a;
          color: white;
        }
      }
    }
    .disabled {
      cursor: not-allowed !important;
      opacity: 0.3;
      /* background-color: black; */
    }
  }
`

const Form = () => {
  const [hideForm, setHideForm] = useAtom(hideFormAtom)
  const [formResponse, setFormResponse] = useAtom(formResponseAtom)
  const [query, setQuery] = useAtom(queryAtom)
  const { register, handleSubmit, reset } = useForm()
  const [formTypes, setFormTypes] = useAtom(formTypesAtom)
  const [formStatus, setFormStatus] = useAtom(formStatusAtom)
  const [isDisabled, setIsDisabled] = useState(true)
  const [roomsData, setRoomsData] = useAtom(roomsDataAtom)

  async function fetchQuery(params) {
    const url = `${import.meta.env.VITE_DATA_SERVICE_URL}/api/campus/Gummersbach/rooms?${params}`
    const response = await fetch(url)
    const data = await response.json()
    console.log("Response", data)
    setFormResponse(data)
    setQuery({
      id: true,
      number: false,
      type: false,
    })
  }

  async function onSubmit(query) {
    // clear current cards
    setQuery({
      id: false,
      number: false,
      type: false,
    })
    setFormResponse("loading")
    // show loading state
    const { building, level, type, status, day, time, asset } = query
    const daysEn = ["Sonntag", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const d = new Date()
    let dayNum = d.getDay()
    const params = new URLSearchParams({
      ...(building && { building }),
      ...(level && { level }),
      ...(type && { type }),
      ...(status && { status }),
      ...(day && status ? { day } : { day: daysEn[dayNum].toLowerCase() }),
      ...(time && status ? { time } : { time: d.getHours() + ":00" }),
    })
    console.log(params.toString())
    asset && asset.forEach((asset) => params.append("asset", asset))
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
    <StyledFilter hideForm={hideForm}>
      <Hide hideForm={hideForm} setHideForm={setHideForm} />
      <div className="scroll">
        <h2>Finde deinen Raum</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <What register={register} />
          <hr />
          <Where register={register} disabled={isDisabled ? "disabled" : ""} />
          <hr />
          <When register={register} />
          <hr />
          <div className="buttons">
            <input
              type="submit"
              value="Raum Suchen"
              disabled={isDisabled ? "disabled" : ""}
              className={isDisabled ? "disabled" : ""}
            />
            <input type="button" onClick={() => handleClick()} value="Reset" />
          </div>
        </form>
      </div>
    </StyledFilter>
  )
}

export default Form
