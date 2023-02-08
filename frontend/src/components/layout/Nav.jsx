import React from "react"
import styled from "styled-components"

const StyledNav = styled.nav`
  outline: 1px solid red;
`

const Nav = (props) => {
  return <StyledNav>{props.children}</StyledNav>
}

export default Nav
