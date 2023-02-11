import styled from "styled-components"

const StyledMain = styled.main`
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2.75rem auto;
  gap: 2rem 0rem;
  padding: 2rem 2.5rem;
  grid-template-areas:
    "nav nav nav"
    "filter .  results";
`

const Main = (props) => {
  return <StyledMain>{props.children}</StyledMain>
}

export default Main
