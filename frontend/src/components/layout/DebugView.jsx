import styled from "styled-components"

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

const DebugView = (props) => {
  return <StyledDebug>{props.children}</StyledDebug>
}

export default DebugView
