import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Box = styled.header`
  display: flex;
  height: 12vh;
  align-items: center;
  gap: 1em;
  a {
    &:first-child {
      color: white;
      font-weight: bold;
      font-size: 1.3em;
      margin-right: 1em;
    }
    color: #d8d8d8;
    text-decoration: none;
  }
`

const Header = () => {
  return (
    <Box>
      <NavLink to={''}>Rick and Morty Wiki</NavLink>
      <NavLink to={'personagens'}>Personagens</NavLink>
      <NavLink to={'locais'}>Locais</NavLink>
    </Box>
  )
}

export default Header