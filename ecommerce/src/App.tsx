import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BillingAddress from "./Components/BillingAddress";
import { Buy } from "./Components/Buy";
import Shipping from "./Components/Shipping";
import ShoppingCart from "./Components/ShoppingCart";
import Billing from "./Components/Billing";
import StateProvider from "./Context/State";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <StateProvider>
                <Buy />
                <Switch>
                    <Route exact path="/shoppingcart">
                        <ShoppingCart />
                    </Route>
                    <Route exact path="/shipping">
                        <Shipping />
                    </Route>
                    <Route exact path="/billingaddress">
                        <BillingAddress />
                    </Route>
                    <Route exact path="/billing">
                        <Billing />
                    </Route>
                    <Route render={() => <Redirect to="/" />}></Route>
                </Switch>
            </StateProvider>
        </BrowserRouter>
    );
};

export default App;
