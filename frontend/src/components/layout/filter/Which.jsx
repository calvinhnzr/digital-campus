import React from "react"

const Which = (props) => {
  const types = ["Lab", "Project", "Lecture"]
  return (
    <div>
      <h4>Raumtyp</h4>
      <select {...props.register("type")} disabled={`${props.disabled}`} className={`${props.disabled}`}>
        <option value="">Alle</option>
        {types.map((roomType, index) => {
          return (
            <option key={index + roomType} value={roomType.toLowerCase()}>
              {roomType}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Which
