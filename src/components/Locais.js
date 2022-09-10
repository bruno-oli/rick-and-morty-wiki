import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

const Box = styled.div`
  .list {
    transition: .3s;
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2em;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border: solid .2em #961227;
      border-radius: .5em;
      cursor: pointer;
      padding: 1.5em;
      gap: .2em;
      text-align: center;
      transition: .3s;
      &:hover {
        background-color: #961227;
        span {
          color: white;
        }
      }
      span {
        transition: .3s;
        span {
          font-weight: bold;
          color: #961227;
        }
        &.nome {
          color: white;
          font-weight: bold;
          font-size: 1.3em;
        }
        &.tipo {
          color: white;
          font-size: 1.1em;
        }
        &.dimensao {
          color: white;
          font-size: 1.1em;
        }
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

const Locais = () => {
  const [dados, setDados] = useState([])
  useEffect(() => {
    async function fetchData() {
      const request = await fetch("https://rickandmortyapi.com/api/location")
      const json = await request.json()
      setDados(json)
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
        <title>Locais | Rick and Morty Wiki</title>
      </Helmet>
      <div className="list">
        {
          dados.results?.map((i, key) => {
            return (
              <div key={key} id={i.id}>
                <span className="nome">{i.name}</span>
                <span className="tipo"><span>Tipo:</span> {i.type}</span>
                <span className="dimensao"><span>Dimensão:</span> {i.dimension}</span>
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

export default Locais