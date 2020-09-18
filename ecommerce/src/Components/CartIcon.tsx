import * as React from "react";
import { StateContext, TContext } from "../Context/State";
import { useHistory } from "react-router-dom";
import "./CartIcon.css";

export const CartIcon: React.FC = () => {
    const { cart, sumItems } = React.useContext<TContext | null>(StateContext)!;

    const history = useHistory();

    const [count, setCount] = React.useState<number>(0);

    React.useEffect(() => {
        setCount(sumItems);
    }, [cart]);

    return (
        <div onClick={() => history.replace("/shoppingcart")} id="cart-icon">
            <i className="fas fa-shopping-cart"></i>
            <div>{count}</div>
        </div>
    );
};
