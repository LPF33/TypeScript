import React from 'react';
import Navbar from "./components/Navbar";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Planets from './components/Planets';
import People from './components/People';
import styled from "styled-components";

const Heading = styled.h1`
  color: black;
  font-size: 4em;
  letter-spacing: 2px;
`;

function App() {
  return (
    <BrowserRouter>
      <Heading>Starwars Info</Heading>
      <Navbar />
      <Switch>
        <Route exact path="/planets" component={Planets}/>
        <Route exact path="/people" component={People}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
