import React from "react"
import styled from "styled-components"
import { useAtom } from "jotai"

import { FaMap, FaCameraRetro } from "react-icons/fa"

import { roomTypesAtom, perspectiveAtom } from "../../../store.jsx"

import Search from "./Search.jsx"
import RoomTypes from "./RoomTypes.jsx"

const StyledNav = styled.nav`
  /* outline: 1px solid red; */
  position: absolute;
  gap: 0 2rem;
  display: flex;
  height: 3rem;
  width: 100%;
  height: auto;
  padding: 1.5rem 2rem;
  .perspective {
    /* outline: 1px solid red; */
    z-index: 100;
    cursor: pointer;
    input {
      display: none;
    }
    svg {
      font-size: 2.75rem;
      transform: scale(0.7);
    }
  }

  @media (max-width: 510px) {
    flex-direction: column;
    /* padding: 1.5rem 0; */
    gap: 1.5rem;
  }
`

const Nav = (props) => {
  const [orthograficView, setOrthograficView] = useAtom(perspectiveAtom)

  return (
    <StyledNav>
      <Search />
      <RoomTypes />
      <label className="perspective">
        {!orthograficView ? <FaMap /> : <FaCameraRetro />}
        <input type="button" onClick={() => setOrthograficView(!orthograficView)} />
      </label>
    </StyledNav>
  )
}

export default Nav
