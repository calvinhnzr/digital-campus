import { useState, useEffect } from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import { useAtom } from "jotai"

import Asset from "./Assets"
import { hideFormAtom } from "../../../store"

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
  /* outline: 1px solid red; */
  border-radius: 6px;
  padding: 2rem;
  z-index: 2200;
  box-shadow: 5px 4px 14px rgba(0, 0, 0, 0.35);
  > * {
    color: black;
  }

  form {
  }
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  h4 {
    font-weight: 700;
    font-size: 1.2rem;
    padding-bottom: 1rem;
  }
  padding-bottom: 2rem;

  &.status {
    &.date-time {
      flex-direction: row;
    }
  }
  &.assets {
    flex-direction: row;
    flex-flow: row wrap;
    input:checked {
      background: red;
    }
    input {
      /* display: none; */
    }
  }
`

const Filter = (props) => {
  const [assets, setAssets] = useState()
  const [hideForm, setHideForm] = useAtom(hideFormAtom)
  const weekDays = ["-", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
  const types = ["lab", "project", "lecture"]
  const levels = ["Alle", "Erdgeschoss", "1. Etage", "2. Etage", "3. Etage"]
  const d = new Date()
  let dayNum = d.getDay()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  async function handleFetchAssets() {
    const url = "http://localhost:8000/api/assets"
    const response = await fetch(url)
    const data = await response.json()
    setAssets(data)
  }

  ;("localhost:8000/api/campus/Gummersbach/rooms/query?day=tuesday&time=12:00&building=Gebäude A&level=3&type=labor&asset=63bda39f455c6a8f49d1b28c&asset=63bda39f455c6a8f49d1b289")

  async function onSubmit(query) {
    // console.log(data)

    // const assets = data.asset

    const params = new URLSearchParams({
      day: query.day.toString(), // requiered
      time: query.time.toString(), // requiered
      building: query.building.toString(), // requiered
      level: query.level,
      type: query.type,
    })
    query.asset.forEach((asset) => params.append("asset", asset))

    console.log(params.toString())
    const url = "http://localhost:8000/api/campus/Gummersbach/rooms/query?" + params
    console.log(url)
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
  }

  useEffect(() => {
    handleFetchAssets()
  }, [])

  // watch input value by passing the name of it

  return (
    <StyledFilter>
      <label>
        <input type="button" onClick={() => setHideForm(!hideForm)} />
      </label>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section className="status">
          <h4>Verfügbarkeit</h4>
          <label>
            <input type="radio" value="free" name="status" {...register("status")} />
            Free
          </label>
          <label>
            <input type="radio" value="busy" name="status" {...register("status")} />
            Busy
          </label>
          <label>
            <input type="radio" value="lesson" name="status" {...register("status")} />
            Lesson
          </label>
          <div className="date-time">
            <div className="day">
              <p>Wochentag</p>
              <select name="day" defaultValue={weekDays[dayNum]} {...register("day")}>
                {weekDays.map((day, index) => {
                  return (
                    <option key={index + day} value={day}>
                      {day}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="time">
              <label>
                <p>Uhrzeit (8:00 - 21:00)</p>
                <input
                  type="time"
                  min="08:00"
                  max="21:00"
                  step="300"
                  {...register("time")}
                  // value={new Date().toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" })}
                />
              </label>
            </div>
          </div>
        </Section>

        <Section>
          <h4>Raumtyp</h4>
          <select {...register("type")}>
            {types.map((roomType, index) => {
              return (
                <option key={index + roomType} value={roomType.toLowerCase()}>
                  {roomType}
                </option>
              )
            })}
          </select>
        </Section>

        <Section className="assets">
          <h4>Equipment</h4>
          <div>
            {assets &&
              assets.map((value) => {
                return <Asset key={value._id} value={value} register={register} />
              })}
          </div>
        </Section>

        <Section>
          <h4>Etage</h4>
          <select {...register("level")}>
            {levels.map((level, index) => {
              return (
                <option key={level} value={index}>
                  {level}
                </option>
              )
            })}
          </select>
        </Section>

        <Section>
          <h4>Gebäude</h4>
          <select {...register("building")}>
            <option value="Gebäude A">Gebäude A</option>
            <option value="Gebäude B">Gebäude B</option>
          </select>
        </Section>

        <input type="submit" />
      </form>
    </StyledFilter>
  )
}

export default Filter
