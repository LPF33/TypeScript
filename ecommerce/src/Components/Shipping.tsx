import * as React from "react";
import "./Shipping.css";
import { Link } from "react-router-dom";
import { StateContext, TAddress, TContext } from "../Context/State";

const Shipping: React.FC = () => {
    const {
        address,
        setAddress,
        twoAddresses,
        set2Addresses,
    } = React.useContext<TContext | null>(StateContext)!;

    return (
        <div id="shipping">
            <Link to="/shoppingcart" className="back">
                <i className="fas fa-chevron-left"></i> Go back to bag
            </Link>
            <form onSubmit={() => setAddress}>
                <h3>Shipping Address</h3>
                <label>Your last name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    value={address.lastname}
                />
                <label>Your first name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    value={address.firstname}
                />
                <label>Street name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    value={address.streetname}
                />
                <label>Street number:</label>
                <input
                    type="text"
                    autoComplete="off"
                    value={address.streetnumber}
                />
                <label>ZIP Code</label>
                <input
                    type="text"
                    autoComplete="off"
                    value={address.postalcode}
                />
                <label>City name</label>
                <input type="text" autoComplete="off" value={address.city} />
                <div id="question-address">
                    <input
                        type="checkbox"
                        onChange={() => set2Addresses((prev) => !prev)}
                    />
                    <label>I have a different billing address</label>
                </div>
            </form>
            {!twoAddresses && (
                <Link to="/billing" className="next">
                    Next <i className="fas fa-chevron-right"></i>
                </Link>
            )}
            {twoAddresses && (
                <Link to="/billingaddress" className="next">
                    Next <i className="fas fa-chevron-right"></i>
                </Link>
            )}
        </div>
    );
};

export default Shipping;
