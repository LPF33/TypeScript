import * as React from "react";
import { StateContext, TContext } from "../Context/State";
import { useHistory } from "react-router-dom";
import "./CartIcon.css";

export const CartIcon: React.FC = () => {
    const { cart } = React.useContext<TContext | null>(StateContext)!;

    const history = useHistory();

    const [count, setCount] = React.useState<number>(0);

    React.useEffect(() => {
        let sum: number = 0;
        if (cart.length > 0) {
            for (let item of cart) {
                sum += item.amount;
            }
        }
        setCount(sum);
    }, [cart]);

    return (
        <div onClick={() => history.replace("/shoppingcart")} id="cart-icon">
            <i className="fas fa-shopping-cart"></i>
            <div>{count}</div>
        </div>
    );
};
