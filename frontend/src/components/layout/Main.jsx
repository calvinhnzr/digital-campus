import styled from "styled-components"

const StyledMain = styled.main`
  /* outline: 1px solid red; */
  position: absolute;
  display: grid;
  grid-template-rows: 7rem minmax(0, auto);
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: column;

  /* gap: 2rem 0rem; */

  grid-template-areas:
    "nav nav nav "
    "filter .  results";

  @media (max-width: 510px) {
    /* grid-template-columns: auto;
    grid-template-areas:
      "filter"
      "filter"; */
  }
`

const Main = (props) => {
  return <StyledMain>{props.children}</StyledMain>
}

export default Main
