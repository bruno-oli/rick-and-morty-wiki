import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Search = () => {
  const { id } = useParams()
  const [dados, setDados] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    async function fetchData() {
      fetch(`https://rickandmortyapi.com/api/character/?name=${id}`).then((response) => response.json()).then((json) => setDados(json))
    }
    fetchData()
  }, [id])
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
  function errorPage() {
    const ErrorTittle = styled.h1`
      color: white;
      width: 100%;
      text-align: center;
    `
    if (dados.hasOwnProperty("error")) {
      return <ErrorTittle>Nenhum personagem com esse nome foi encontrado!</ErrorTittle>
    }
  }
  const Container = styled.div`
    margin-top: 2em;
    .list {
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
      transition: .3s;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      justify-items: center;
      gap: 3em;
      div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 100%;
          border-radius: 100%;
          margin-bottom: 1em;
          cursor: pointer;
          transition: .1s;
          &:hover {
            outline: solid .5em white;
          }
        }
        span {
          color: white;
          text-align: center;
          &.nome {
            cursor: pointer;
            font-size: 1.3em;
            font-weight: bold;
            transition: color .3s;
            &:hover {
              color: #961227;
            }
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
  return (
    <Container>
      <Helmet>
        <title>{id} | Rick and Morty Wiki</title>
      </Helmet>
      {
        errorPage()
      }
      <div className="list">
        {
          dados.results?.map((i, key) => {
            return (
              <div key={key}>
                <img src={i.image} alt="" />
                <span className='nome'>{i.name}</span>
                <span className='genero'>{i.gender}</span>
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
    </Container>
  )
}

export default Search