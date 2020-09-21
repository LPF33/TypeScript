import * as React from "react";
import "./Buy.css";
import { CartIcon } from "./CartIcon";
import getShopData, { TData } from "../MockData/sampleData";
import { StateContext, TContext } from "../Context/State";

export const Buy: React.FC = () => {
    const [shopData, setShopData] = React.useState<TData[]>([]);

    React.useEffect(() => {
        (async () => {
            const data: TData[] = await getShopData();
            setShopData(data);
        })();
    }, []);

    return (
        <div id="buy">
            <header>
                <h1>SHOP MORE STUFF!</h1>
                <CartIcon />
            </header>

            <div className="buy">
                {shopData.length > 0 &&
                    shopData.map((item) => (
                        <ShopItem {...item} key={item.id} />
                    ))}
            </div>
        </div>
    );
};

type Action = "increment" | "decrement";

const ShopItem: React.FC<TData> = (item) => {
    const [count, setCount] = React.useState<number>(0);

    const { cart, setCart } = React.useContext<TContext | null>(StateContext)!;

    const itemCount = (action: Action): void => {
        switch (action) {
            case "decrement":
                count === 0 ? setCount(0) : setCount((prev) => prev - 1);
                break;
            case "increment":
                setCount((prev) => prev + 1);
                break;
        }
    };

    const addToCart = () => {
        if (count > 0) {
            const helper = [...cart];

            const index = helper.findIndex((value) => value.id === item.id);
            if (index === -1) {
                setCart((prev) => [
                    ...prev,
                    {
                        id: item.id,
                        product: item.product,
                        amount: count,
                        price: item.price,
                        image: item.image,
                    },
                ]);
            } else {
                helper[index].amount += count;
                setCart(helper);
            }
        }

        setCount(0);
    };

    return (
        <div className="container" key={item.product}>
            <img src={item.image} alt="watch"></img>
            <h4>{item.product}</h4>
            <h6>{item.price}€</h6>
            <div className="select">
                <button onClick={() => itemCount("decrement")}>-</button>
                <div className="counter">{count}</div>
                <button onClick={() => itemCount("increment")}>+</button>
            </div>
            <button onClick={addToCart}>ADD</button>
        </div>
    );
};
