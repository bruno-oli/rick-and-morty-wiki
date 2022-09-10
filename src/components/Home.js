import React, { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Box = styled.main`
  width: 100%;
  height: 83vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    label {
      font-size: 1.5rem;
      color: #d8d8d8;
      margin-bottom: .5rem;
      font-weight: 500;
    }
    div {
      display: flex;
      gap: 1rem;
      a {
        background-color: #961227;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        border-radius: .5rem;
        color: #d8d8d8;
        width: 7rem;
        font-size: 1rem;
        font-weight: bold;
      }
      input {
        width: 35rem;
        height: 3rem;
        background: none;
        border: solid .2rem #961227;
        border-radius: .5rem;
        padding-left: 1rem;
        color: white;
        &::placeholder {
          font-style: italic;
        }
      }
    }
  }
`

const Home = () => {
  const [personagem, setPersonagem] = useState('')
  const input = useRef()
  function inputListener() {
    setPersonagem(input.current.value)
  }
  return (
    <Box>
      <Helmet>
        <title>Home | Rick and Morty Wiki</title>
      </Helmet>
      <div className='container'>
        <label htmlFor="search">Procure um personagem</label>
        <div>
          <input ref={input} onChange={inputListener} type="text" id='search' placeholder='Ex: Rick, Morty...'/>
          <NavLink to={`search/${personagem}`}>Procurar</NavLink>
        </div>
      </div>
    </Box>
  )
}

export default Home