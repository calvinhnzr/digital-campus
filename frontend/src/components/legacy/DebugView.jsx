import styled from "styled-components"
import { atom, useAtom } from "jotai"

const StyledDebug = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  inset: 1rem;
  outline: 1px solid red;
  height: fit-content;
  width: fit-content;
`

import { searchRoomAtom, perspectiveAtom } from "../../store"

const DebugView = () => {
  const [orthographicView, setOrthographicView] = useAtom(perspectiveAtom)
  const [searchRoom, setSearchRoom] = useAtom(searchRoomAtom)
  return (
    <StyledDebug>
      <label>
        Top Down / Orthographic View
        <input type="checkbox" onChange={() => setOrthographicView(!orthographicView)} checked={orthographicView} />
      </label>
      <label>
        Suche Raum{" "}
        <input type="text" placeholder="3216" onChange={(e) => setSearchRoom(e.target.value)} value={searchRoom} />
      </label>
    </StyledDebug>
  )
}

export default DebugView
