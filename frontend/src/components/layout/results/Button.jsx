import { useLayoutEffect } from "react"
import styled from "styled-components"
import { useAtom } from "jotai"
import { currentRoomAtom, newRoomAtom } from "../../../store"

import { newTokenAtom, currentTokenAtom } from "../../../App"

const StyledButton = styled.label`
  /* opacity: 0.5; */
  padding-top: 1.5rem;
  input {
    grid-area: button;
    border-radius: 6px;
    border: 1px solid transparent;
    padding: 0.6em 1.8em;
    width: fit-content;
    margin-bottom;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
    opacity: 0.3;
    color: white;
    cursor: pointer;
    transition: border-color 0.25s;
    cursor: not-allowed;
    &.login {
      cursor: pointer;
      background-image: none;
      background-color: #47da1b;
      /* background-color: #1a1a1a; */
      opacity: 1;
    }
    &.logout {
      cursor: pointer;
      background-image: none;
      background-color: #da1b4e;
      opacity: 1;
    }
  }  
`

const Button = (props) => {
  const [newRoom, setNewRoom] = useAtom(newRoomAtom)
  const [currentRoom, setCurrentRoom] = useAtom(currentRoomAtom)
  const [newToken, setNewToken] = useAtom(newTokenAtom)
  const [currentToken, setCurrentToken] = useAtom(currentTokenAtom)

  async function handleFetch(method, body) {
    const response = await fetch(`${import.meta.env.VITE_AUTH_SERVICE_URL}/auth`, {
      method: `${method}`,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) return false

    const data = await response.json()
    return data
  }

  async function login() {
    const body = { tokenOld: currentToken, tokenNew: newToken }

    const data = await handleFetch("POST", body)

    if (data) {
      setNewToken("")
      setCurrentToken(data.token)

      setNewRoom({ number: "", loggedIn: false })
      setCurrentRoom({ number: props.number, loggedIn: true })

      localStorage.removeItem("newToken")
    }
  }

  async function logout() {
    const body = { token: currentToken }

    const data = await handleFetch("DELETE", body)

    if (data) {
      setCurrentToken("")
      setCurrentRoom({ number: "", loggedIn: false })

      localStorage.removeItem("currentToken")
    }
  }

  async function handleClick() {
    const room = props.number === currentRoom.number ? currentRoom : newRoom
    const loggedIn = room.loggedIn
    loggedIn ? logout() : login()
  }

  if (props.number === currentRoom.number) {
    return (
      <StyledButton>
        <input
          type="button"
          value={currentRoom.loggedIn ? "Raum verlassen" : "Raum betreten"}
          className={currentRoom.loggedIn ? "logout" : "login"}
          onClick={(e) => handleClick(e)}
        />
      </StyledButton>
    )
  } else if (props.number === newRoom.number) {
    return (
      <StyledButton>
        <input
          type="button"
          value={newRoom.loggedIn ? "Raum verlassen" : "Raum betreten"}
          className={newRoom.loggedIn ? "logout" : "login"}
          onClick={(e) => handleClick(e)}
        />
      </StyledButton>
    )
  } else {
    return (
      <StyledButton>
        <input type="button" value="Raum betreten" />
      </StyledButton>
    )
  }
}

export default Button
