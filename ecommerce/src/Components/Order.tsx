import * as React from "react";
import "./Order.css";
import { StateContext, TContext } from "../Context/State";
import { Link } from "react-router-dom";
import { confirmOrder, TOrderConfirm } from "../MockData/confirmation";

const Order: React.FC = () => {
    const {
        address,
        billingAddress,
        twoAddresses,
        hasAddress,
        payMethod,
        cart,
        calcSum,
        sumItems,
        agbs,
        setAGBs,
        newsLetter,
        setNewsLetter,
        reset,
    } = React.useContext<TContext | null>(StateContext)!;

    const [total, setTotal] = React.useState<{ total: number; items: number }>({
        total: 0,
        items: 0,
    });

    const [confirmed, setConfirmd] = React.useState<TOrderConfirm | null>(null);

    React.useEffect(() => {
        setTotal({ total: calcSum(), items: sumItems() });
    }, [cart]);

    const confirm = async () => {
        const data = await confirmOrder(address, newsLetter);
        setConfirmd(data);
        reset();
    };

    if (!confirmed) {
        return (
            <div id="order">
                <Link to="/billing" className="back">
                    <i className="fas fa-chevron-left"></i> Go back to Billing
                </Link>
                <div id="order-container">
                    <h5>
                        {twoAddresses
                            ? "Delivery address:"
                            : "Delivery and billing address:"}
                    </h5>
                    <div>
                        <p>
                            {address.firstname} {address.lastname}
                        </p>
                        <p>
                            {address.streetname} {address.streetnumber}
                        </p>
                        <p>
                            {address.postalcode} {address.city}
                        </p>
                    </div>
                    <Link to="/shipping" className="edit">
                        Edit
                    </Link>
                    {twoAddresses && (
                        <div>
                            <h5>billing address:</h5>
                            <div>
                                <p>
                                    {billingAddress.firstname}{" "}
                                    {billingAddress.lastname}
                                </p>
                                <p>
                                    {billingAddress.streetname}{" "}
                                    {billingAddress.streetnumber}
                                </p>
                                <p>
                                    {billingAddress.postalcode}{" "}
                                    {billingAddress.city}
                                </p>
                            </div>
                        </div>
                    )}
                    {twoAddresses && (
                        <Link to="/billingaddress" className="edit">
                            Edit
                        </Link>
                    )}
                    <h5 className="line">Your order:</h5>
                    {cart.length > 0 &&
                        cart.map((item) => (
                            <div key={item.id} className="preview">
                                <img src={item.image} alt={item.product}></img>
                                <div>
                                    <h5>Product: {item.product}</h5>
                                    <h5>Quantity: {item.amount}</h5>
                                    <h6>Amount: {item.price * item.amount}€</h6>
                                </div>
                            </div>
                        ))}
                    <div id="total">
                        <h5>Total: </h5>
                        <h5>{total.items} Items</h5>
                        <h5>{total.total}€</h5>
                    </div>
                    <Link to="/shoppingcart" className="edit">
                        Edit
                    </Link>
                    <h5 className="line">Paymethod: {payMethod}</h5>
                    <div id="question-address" className="line">
                        <input
                            type="checkbox"
                            checked={agbs}
                            onChange={() => setAGBs((prev) => !prev)}
                        />
                        <label>I accept the terms of business</label>
                    </div>
                    <div id="question-address" className="line">
                        <input
                            type="checkbox"
                            onChange={() => setNewsLetter((prev) => !prev)}
                        />
                        <label>I subscribe to the newsletter</label>
                    </div>
                </div>

                {payMethod && agbs && total.items > 0 && hasAddress && (
                    <button className="next" onClick={confirm}>
                        Buy <i className="fas fa-chevron-right"></i>
                    </button>
                )}
            </div>
        );
    } else {
        return (
            <div id="order">
                <Link to="/" className="back">
                    <i className="fas fa-chevron-left"></i> Go back to main
                </Link>
                <div id="order-container">
                    <h3>Order confirmation:</h3>
                    <div>
                        <p>OrderId: {confirmed.orderID}</p>
                        <p>OrderNumber: {confirmed.orderNumber}</p>
                        <p>Customer Name: {confirmed.customerName}</p>
                        <p>Customer Mail: {confirmed.customerMail}</p>
                        <p>Delivery Address: {confirmed.deliveryAddress}</p>
                        <p>
                            Newsletter subscription:{" "}
                            {confirmed.newsletterAbo ? "yes" : "no"}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Order;
