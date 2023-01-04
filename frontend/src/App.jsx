import { useState, useEffect } from "react"

import { fetchData } from "./helpers/fetchData"

import "./App.css"

function App() {
  const [data, setData] = useState(0)
  const url = "http://localhost:8000/api/rooms"

  useEffect(() => {
    fetchData("GET", url).then((data) => setData(data))
  }, [])

  return <div className="App">{data ? data.map((room) => <p>Room: {room.roomNo} </p>) : <p>Loading...</p>}</div>
}

export default App
