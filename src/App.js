import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";

import Home from "./components/Home"
import Personagens from "./components/Personagens"
import Locais from "./components/Locais"

import styled from "styled-components";

import "./reset.css"
import Search from "./components/Search";

const ErrorTittle = styled.h1`
  color: white;
  width: 100%;
  text-align: center;
`

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}> 
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="personagens" element={<Personagens />} />
        <Route path="locais" element={<Locais />} />
        <Route path="search/:id" element={<Search />}/>
        <Route path="search/" element={<ErrorTittle>Insira o nome de algum personagem!</ErrorTittle>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
