import * as React from "react";
import "./ShoppingCart.css";
import { StateContext, TContext, TCart } from "../Context/State";
import { Link } from "react-router-dom";

type Action = "increment" | "decrement" | "delete";

const ShoppingCart: React.FC = () => {
    const { cart, calcSum, sumItems } = React.useContext<TContext | null>(
        StateContext
    )!;

    const shopRef = React.useRef<HTMLDivElement>(null!);

    const [show, setShow] = React.useState<string>("hide");
    const [total, setTotal] = React.useState<{ total: number; items: number }>({
        total: 0,
        items: 0,
    });

    React.useEffect(() => {
        setShow("show");
    }, []);

    React.useEffect(() => {
        setTotal({ total: calcSum(), items: sumItems() });
    }, [cart]);

    return (
        <div id="shopping-cart" className={show} ref={shopRef}>
            <div id="shopping-cart-container">
                <i className="fas fa-shopping-cart"></i>
                <Link id="close" to="/">
                    X
                </Link>
                {cart.length === 0 && <h6>No items in your shopping cart!</h6>}
                <>
                    {cart.length > 0 &&
                        cart.map((item, index) => (
                            <Preview {...item} index={index} key={item.id} />
                        ))}
                    {cart.length > 0 && (
                        <div id="total">
                            <h5>Total: </h5>
                            <h5>{total.items} Items</h5>
                            <h5>{total.total}€</h5>
                        </div>
                    )}
                    {cart.length > 0 && (
                        <Link to="/shipping" className="preview-link">
                            <div id="checkout">Checkout</div>
                        </Link>
                    )}
                </>
            </div>
        </div>
    );
};

const Preview = ({
    id,
    product,
    amount,
    price,
    image,
    index,
}: TCart & { index: number }) => {
    const { setCart } = React.useContext<TContext | null>(StateContext)!;

    const itemCount = (action: Action): void => {
        switch (action) {
            case "decrement":
                amount >= 0
                    ? itemCount("delete")
                    : setCart((prev) => {
                          const helper = [...prev];
                          helper[index].amount = amount - 1;
                          return helper;
                      });
                break;
            case "increment":
                setCart((prev) => {
                    const helper = [...prev];
                    helper[index].amount = amount + 1;
                    return helper;
                });
                break;
            case "delete":
                setCart((prev) => {
                    const helper = [...prev];
                    helper.splice(index, 1);
                    return helper;
                });
                break;
        }
    };
    return (
        <div key={id} className="preview">
            <img src={image} alt={product}></img>
            <div>
                <h5>Product: {product}</h5>
                <h5>Quantity: {amount}</h5>
                <h6>Amount: {price * amount}€</h6>
            </div>
            <div>
                <div className="select">
                    <button onClick={() => itemCount("decrement")}>-</button>
                    <div className="counter">{amount}</div>
                    <button onClick={() => itemCount("increment")}>+</button>
                </div>
                <div className="icon" onClick={() => itemCount("delete")}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
