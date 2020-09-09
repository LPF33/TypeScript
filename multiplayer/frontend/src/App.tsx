import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Welcome from "./Components/Welcome";
import MiniRacer from "./Components/MiniRacer";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/miniracer/:room" component={MiniRacer} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
