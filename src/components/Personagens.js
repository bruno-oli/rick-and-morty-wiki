import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

const Box = styled.div`
  @keyframes animIcons {
    from {
      transform: translateX(-100vw);
      opacity: 0;
    }
    to {
      transform: initial;
      opacity: initial;
    }
  }
  animation: animIcons .5s forwards;
  .list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    row-gap: 3em;
    width: 100%;
    div {
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        cursor: pointer;
        transition: .2s;
        margin-bottom: 1em;
        width: 100%;
        border-radius: 100%;
        &:hover {
          outline: solid .5em white;
        }
      }
      span {
        color: white;
        font-weight: bold;
        font-size: 1.4em;
        text-align: center;
      }
    }
  }
  nav {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1em;
    margin-top: 2em;
    span {
      width: 1.5em;
      height: 1.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: .3em;
      color: white;
      border: solid .2em #961227;
      border-radius: .3em;
    }
    button {
      cursor: pointer;
      width: 6em;
      text-align: center;
      text-decoration: none;
      padding: .3em;
      color: white;
      border: solid .2em #961227;
      border-radius: .3em;
      background: none;
    }
  }
`

const Personagens = () => {
  const [dados, setDados] = useState({})
  useEffect(() => {
    async function fetchData() {
      fetch("https://rickandmortyapi.com/api/character").then((response) => response.json()).then((json) => setDados(json))
    }
    fetchData()
  }, [])
  const [page, setPage] = useState(1)
  function nextPage() {
    if (page < dados.info.pages) {
      fetch(dados.info.next).then((response) => response.json()).then((json) => setDados(json))
      setPage(page + 1)
    }
  }
  function prevPage() {
    if (page > 1) {
      fetch(dados.info.prev).then((response) => response.json()).then((json) => setDados(json))
      setPage(page - 1)
    }
  }
  return (
    <Box>
      <Helmet>
        <title>Personagens | Rick and Morty Wiki</title>
      </Helmet>
      <div className="list">
        {
          dados.results?.map((i, key) => {
            return (
              <div key={key}>
                <img src={i.image} alt="" />
                <span>{i.name}</span>
              </div>
            )
          })
        }
      </div>
      <nav>
        <button onClick={prevPage}>Anterior</button>
        <span className='page'>{page}</span>
        <button onClick={nextPage}>Proxima</button>
      </nav>
    </Box>
  )
}

export default Personagens