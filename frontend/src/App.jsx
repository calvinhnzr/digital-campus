import { useEffect, useState, useLayoutEffect } from "react"
import { Center } from "@react-three/drei"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useSearchParams } from "react-router-dom"
import jwt_decode from "jwt-decode"
import io from "socket.io-client"

import "./styles/App.css"

import { campusDataAtom, currentRoomAtom, newRoomAtom, queryAtom, hideFormAtom } from "./store"
import Main from "./components/layout/Main"
import Nav from "./components/layout/nav/Nav"
import Scene from "./components/render/Scene"
import Camera from "./components/render/Camera"
import Campus from "./components/render/Campus"
import Results from "./components/layout/results/Results"
import Form from "./components/layout/filter/Form"
import Blackout from "./components/layout/Blackout"

export const newTokenAtom = atomWithStorage("newToken", false)
export const currentTokenAtom = atomWithStorage("currentToken", false)

const roomSocket = io.connect(import.meta.env.VITE_AUTH_SERVICE_URL)

function App() {
  const [campusData, setCampusData] = useAtom(campusDataAtom)
  const [newToken, setNewToken] = useAtom(newTokenAtom)
  const [currentToken, setCurrentToken] = useAtom(currentTokenAtom)
  const [newRoom, setNewRoom] = useAtom(newRoomAtom)
  const [currentRoom, setCurrentRoom] = useAtom(currentRoomAtom)
  const [query, setQuery] = useAtom(queryAtom)
  const [hideForm, setHideForm] = useAtom(hideFormAtom)

  let [searchParams, setSearchParams] = useSearchParams()

  const url = `${import.meta.env.VITE_DATA_SERVICE_URL}/api/campus`
  const handleFetchCampus = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setCampusData(data)
  }

  const handleLoadTokens = async () => {
    // get new token from query and update state
    const qToken = searchParams.get("token")
    qToken && setNewToken(qToken)

    // query token is the same as current token, delete query token
    if (qToken === currentToken) {
      localStorage.removeItem("newToken")
      setNewRoom({ number: "", loggedIn: false })
      setNewToken("")
    }

    // clear search params
    setSearchParams({})
  }

  const authToken = async () => {
    setNewRoom({ number: "", loggedIn: false })
    setCurrentRoom({ number: "", loggedIn: false })

    const newTokenStatus = newToken && (await checkTokenStatus(newToken))
    const currentTokenStatus = currentToken && (await checkTokenStatus(currentToken))

    if (newTokenStatus.ok) {
      setNewRoom({ number: jwt_decode(newToken).room, loggedIn: true })
    }

    if (newTokenStatus.status == 404) {
      setNewRoom({ number: jwt_decode(newToken).room, loggedIn: false })
    }

    if (currentTokenStatus.ok) {
      setCurrentRoom({ number: jwt_decode(currentToken).room, loggedIn: true })
    }

    if (currentTokenStatus.status === 404) {
      setCurrentRoom({ number: jwt_decode(currentToken).room, loggedIn: false })
    }
  }

  const checkTokenStatus = async (token) => {
    let url = `${import.meta.env.VITE_AUTH_SERVICE_URL}/auth?token=${token}`
    return await fetch(url)
  }

  useEffect(() => {
    roomSocket.connect()
    handleFetchCampus(url)
    handleLoadTokens()

    return () => {
      localStorage.removeItem("newToken")
      setNewRoom({ number: "", loggedIn: false })
    }
  }, [])

  useEffect(() => {
    ;(newToken || currentToken) && authToken()
  }, [newToken, currentToken])

  useLayoutEffect(() => {
    setQuery({
      id: "",
      number: currentRoom.number ? currentRoom.number : newRoom.number,
      type: "",
    })
  }, [newRoom.number])

  return (
    <div className="App">
      <Main>
        <Nav />
        <Form />
        {!hideForm && <Blackout />}
      </Main>
      <Results roomSocket={roomSocket} />
      <Scene>
        <Camera />
        <Center>
          <Campus campusData={campusData} />
        </Center>
      </Scene>
    </div>
  )
}

export default App
