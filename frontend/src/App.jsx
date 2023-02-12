import { useEffect, useState } from "react"
import { Center } from "@react-three/drei"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useSearchParams } from "react-router-dom"
import jwt_decode from "jwt-decode"

import "./styles/App.css"

import { campusDataAtom, verifiedRoomAtom } from "./store"

import Main from "./components/layout/Main"
import Nav from "./components/layout/nav/Nav"
import Scene from "./components/render/Scene"
import Camera from "./components/render/Camera"
import Campus from "./components/render/Campus"
import Results from "./components/layout/results/Results"
import Filter from "./components/layout/filter/Filter"

export const newTokenAtom = atomWithStorage("newToken", false) // temp
export const oldTokenAtom = atomWithStorage("oldToken", false)

function App() {
  const url = "http://localhost:8000/api/campus"
  const [campusData, setCampusData] = useAtom(campusDataAtom)
  const [newToken, setNewToken] = useAtom(newTokenAtom)
  const [oldToken, setOldToken] = useAtom(oldTokenAtom)
  const [verifiedRoom, setVerifiedRoom] = useAtom(verifiedRoomAtom)

  let [searchParams, setSearchParams] = useSearchParams()

  const handleFetchCampus = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setCampusData(data)
  }

  const handleParamToken = async () => {
    const paramToken = searchParams.get("token")
    paramToken && setNewToken(paramToken)
  }

  const handleFetchToken = async () => {
    let url = `http://localhost:8002/`
    const res = await fetch(url)
    const data = await res.json()
    setNewToken(data.token)
  }

  async function authToken() {
    let newValidToken, oldValidToken
    newToken && (newValidToken = await isTokenValide(newToken))
    oldToken && (oldValidToken = await isTokenValide(newToken))

    console.log(newValidToken)
    console.log(jwt_decode(newToken).room)

    if (!newToken && !oldToken) {
      // normaler Seitenaufruf
    }

    if (newToken && !oldToken && newValidToken) {
      // komponenten für raum frei schalten
      // button: change state
      setVerifiedRoom({
        number: `${jwt_decode(newToken).room}`,
        status: newValidToken.exists,
      })
    }
  }

  const isTokenValide = async (token) => {
    let url = `http://localhost:8002/auth?token=${token}`
    const response = await fetch(url)
    if (!response.ok) {
      return false
    }
    const payload = await response.json()
    return payload
  }

  useEffect(() => {
    handleFetchCampus(url)

    handleFetchToken()
    // handleParamToken()
  }, [])

  useEffect(() => {
    ;(newToken || oldToken) && authToken()
  }, [newToken, oldToken])

  return (
    <div className="App">
      <Nav />
      <Main>
        {/* <Filter /> */}
        <Results />
      </Main>
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
