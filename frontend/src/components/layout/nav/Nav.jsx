import React from "react"
import styled from "styled-components"
import { useAtom } from "jotai"
import { FaMap, FaCameraRetro } from "react-icons/fa"
import { AiOutlineForm } from "react-icons/ai"

import { hideFormAtom, perspectiveAtom, queryAtom } from "../../../store.jsx"
import Search from "./Search.jsx"
import RoomTypes from "./RoomTypes.jsx"

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  top: 2rem;
  right: 2.5rem;
  z-index: 9999;
  @media (max-width: 510px) {
    top: 0;
    right: 1.5rem;
    /* display: none; */
  }
  .reset {
    cursor: pointer;
    input {
      display: none;
    }
  }
  .perspective {
    cursor: pointer;
    input {
      display: none;
    }
    svg {
      font-size: 2.75rem;
      transform: scale(0.7);
    }
  }
`

const StyledNav = styled.nav`
  grid-area: nav;
  gap: 1rem 2rem;
  display: flex;
  align-items: center;
  height: 3rem;
  background: linear-gradient(to bottom, #506177, #50617700);
  height: auto;
  width: 100%;
  padding: 2rem 3rem;
  position: fixed;
  z-index: 4001;
  /* mobile */

  @media (max-width: 510px) {
    flex-direction: column;
    gap: 1.5rem 2rem;
    padding: 0rem;
    margin-top: 1.5rem;
  }
`

const Nav = (props) => {
  const [orthograficView, setOrthograficView] = useAtom(perspectiveAtom)
  const [hideForm, setHideForm] = useAtom(hideFormAtom)
  const [query, setQuery] = useAtom(queryAtom)

  function handleReset() {
    setQuery({
      id: false,
      number: false,
      type: false,
    })
  }

  return (
    <StyledNav>
      <Search />
      <RoomTypes />
      <Buttons>
        <label className="reset">
          Reset
          <input type="button" onClick={() => handleReset()} />
        </label>
        <label className="perspective">
          {!orthograficView ? <FaMap /> : <FaCameraRetro />}
          <input type="button" onClick={() => setOrthograficView(!orthograficView)} />
        </label>
      </Buttons>
    </StyledNav>
  )
}

export default Nav
