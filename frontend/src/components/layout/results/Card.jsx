import { useState, useEffect } from "react"
import styled from "styled-components"
import { FaFlask, FaChevronDown, FaChevronUp } from "react-icons/fa"

import More from "./More"
import Button from "./Button"

const StyledCard = styled.div`
  width: 360px;
  background-color: #efefef;
  background-color: rgb(239 239 239 / 95%);
  box-shadow: 5px 4px 14px rgba(0, 0, 0, 0.35);
  padding: 1rem;
  border-radius: 6px;
  > * {
    color: #343434;
  }
`

const Header = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  gap: 1rem;
  z-index: 200;
  grid-template-areas:
    "name type"
    "number status";

  .name {
    grid-area: name;
    font-weight: 700;
    justify-self: start;
  }
  .type {
    grid-area: type;
    font-weight: 700;
    color: #4a92d4;
    justify-self: end;
    display: flex;
    text-transform: capitalize;

    svg {
      margin-left: 0.4rem;
      font-size: 1.1rem;
      height: 1rem;
      transform: scale(1.1);
    }
  }
  .number {
    grid-area: number;
    justify-self: start;
  }
  .status {
    grid-area: status;
    justify-self: end;
    display: flex;
    &::before {
      content: " ";
      display: block;
      height: 1rem;
      width: 1rem;
      background-color: #92d557;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
  }
`

const Body = styled.section`
  margin-top: 1.5rem;
  padding-top: 1rem;
  display: grid;
  border-top: 1px solid #d9d9d9;
  flex-direction: column;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  gap: 1rem;
  z-index: 200;
  /* display: none; */
  grid-template-areas:
    "button status"
    "ausstattung ausstattung"
    "stundenplan stundenplan";
  .ausstattung {
    grid-area: ausstattung;
    font-weight: 700;
    justify-self: start;
  }
  .stundenplan {
    grid-area: stundenplan;
    font-weight: 700;
    justify-self: start;
  }
`

const Card = (props) => {
  return (
    <StyledCard>
      <Header>
        <h3 className="name">{props.data.name ? props.data.name : "{name}"}</h3>
        <h4 className="type">
          {props.data.type ? props.data.type : "{type}"} <FaFlask />
        </h4>
        <span className="number">{props.data.number ? props.data.number : "{number}"}</span>
        <p className="status">frei</p>
      </Header>
      <Body>
        <Button />
        <More label="Ausstattung" gridArea="ausstattung" data={props.data}>
          <ul>
            <li>Data</li>
          </ul>
        </More>
        <More label="Stundeplan" gridArea="stundenplan" data={props.data}>
          <ul>
            <li>Data</li>
          </ul>
        </More>
      </Body>
    </StyledCard>
  )
}

export default Card
