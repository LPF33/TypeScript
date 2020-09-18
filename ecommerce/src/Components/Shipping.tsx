import * as React from "react";
import "./Shipping.css";
import { Link } from "react-router-dom";
import { StateContext, TContext } from "../Context/State";
import useVerifyAddress, { EAddress } from "../CustomHooks/VerifyAddress";

const Shipping: React.FC = () => {
    const {
        address,
        setAddress,
        twoAddresses,
        set2Addresses,
    } = React.useContext<TContext | null>(StateContext)!;

    const { error, handleChange } = useVerifyAddress(setAddress);

    return (
        <div id="shipping">
            <Link to="/shoppingcart" className="back">
                <i className="fas fa-chevron-left"></i> Go back to bag
            </Link>
            <form onSubmit={() => setAddress}>
                <h3>Shipping Address</h3>
                {error.length > 0 && <h6 className="error">{error}</h6>}
                <label>Your last name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.lastname}
                    value={address.lastname}
                    onChange={handleChange}
                />
                <label>Your first name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.firstname}
                    value={address.firstname}
                    onChange={handleChange}
                />
                <label>Street name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.streetname}
                    value={address.streetname}
                    onChange={handleChange}
                />
                <label>Street number:</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.streetnumber}
                    value={address.streetnumber}
                    onChange={handleChange}
                />
                <label>ZIP Code</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.postalcode}
                    value={address.postalcode}
                    onChange={handleChange}
                />
                <label>City name</label>
                <input type="text" autoComplete="off" value={address.city} />
                <div id="question-address">
                    <input
                        type="checkbox"
                        name={EAddress.city}
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
