import React from "react"
import styled from "styled-components"
import { useAtom } from "jotai"
import { FaMap, FaCameraRetro } from "react-icons/fa"

import { hideFormAtom, perspectiveAtom } from "../../../store.jsx"
import Search from "./Search.jsx"
import RoomTypes from "./RoomTypes.jsx"

const StyledNav = styled.nav`
  grid-area: nav;
  gap: 0 2rem;
  display: flex;
  height: 3rem;
  background: linear-gradient(to bottom, #636363, #63636300);
  height: auto;
  width: 100%;
  padding: 2rem 3rem;
  position: fixed;
  z-index: 4001;
  .perspective {
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
  const [hideForm, setHideForm] = useAtom(hideFormAtom)
  return (
    <StyledNav>
      {/* <label>
        <input type="button" onClick={() => setHideForm(!hideForm)} />
      </label> */}
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
