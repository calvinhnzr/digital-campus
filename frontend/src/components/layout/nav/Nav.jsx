import React from "react"
import styled from "styled-components"
import { useAtom } from "jotai"

import { FaMap, FaCameraRetro } from "react-icons/fa"

import { perspectiveAtom } from "../../../store.jsx"

import Search from "./Search.jsx"
import RoomTypes from "./RoomTypes.jsx"

const StyledNav = styled.nav`
  /* outline: 1px solid red; */
  /* position: absolute; */
  grid-area: nav;
  gap: 0 2rem;
  padding: 2rem 2.5rem;
  display: flex;
  height: 3rem;
  width: 100%;
  /* width: calc(100% - 5rem); */
  background: linear-gradient(to bottom, #636363, #63636300);

  height: auto;
  position: fixed;
  z-index: 1000;
  .perspective {
    /* outline: 1px solid red; */

    margin-left: auto;
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
