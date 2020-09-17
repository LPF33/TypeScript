import * as React from "react";
import "./Shipping.css";
import { Link } from "react-router-dom";
import { StateContext, TAddress, TContext } from "../Context/State";

const BillingAddress: React.FC = () => {
    const {
        billingAddress,
        setBillingAddress,
    } = React.useContext<TContext | null>(StateContext)!;

    return (
        <div id="shipping">
            <Link to="/shoppingcart" className="back">
                <i className="fas fa-chevron-left"></i> Go back to bag
            </Link>
            <form>
                <h3>Billing Address</h3>
                <label>Last name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    value={billingAddress.lastname}
                />
                <label>First name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    value={billingAddress.firstname}
                />
                <label>Street name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    value={billingAddress.streetname}
                />
                <label>Street number:</label>
                <input
                    type="text"
                    autoComplete="off"
                    value={billingAddress.streetnumber}
                />
                <label>ZIP Code</label>
                <input
                    type="text"
                    autoComplete="off"
                    value={billingAddress.postalcode}
                />
                <label>City name</label>
                <input
                    type="text"
                    autoComplete="off"
                    value={billingAddress.city}
                />
                <div id="question-address"></div>
            </form>
            <Link to="/billing" className="next">
                Next <i className="fas fa-chevron-right"></i>
            </Link>
        </div>
    );
};

export default BillingAddress;
