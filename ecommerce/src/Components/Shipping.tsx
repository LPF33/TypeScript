import * as React from "react";
import "./Shipping.css";
import { Link, useHistory } from "react-router-dom";
import { StateContext, TAddress, TContext } from "../Context/State";
import useVerifyAddress, {
    EAddress,
    TCompletenss,
} from "../CustomHooks/VerifyAddress";

const Shipping: React.FC = () => {
    const {
        address,
        setAddress,
        twoAddresses,
        set2Addresses,
    } = React.useContext<TContext | null>(StateContext)!;

    const { error, handleChange, checkCompleteness } = useVerifyAddress(
        setAddress
    );

    const [complete, setComplete] = React.useState<TCompletenss>({
        complete: false,
        type: {
            lastname: true,
            firstname: true,
            streetname: true,
            streetnumber: true,
            postalcode: true,
            city: true,
        },
    });

    const history = useHistory();

    const nextPage = (val: TAddress): void => {
        setComplete(checkCompleteness(val));
    };

    React.useEffect(() => {
        if (complete.complete && twoAddresses) {
            history.replace("/billingaddress");
        } else if (complete.complete && !twoAddresses) {
            history.replace("/billing");
        }
    }, [complete]);

    return (
        <div id="shipping">
            <Link to="/shoppingcart" className="back">
                <i className="fas fa-chevron-left"></i> Go back to bag
            </Link>
            <form>
                <h3>Shipping Address</h3>
                {error.length > 0 && <h6 className="error">{error}</h6>}
                <label>Your last name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.lastname}
                    value={address.lastname}
                    onChange={handleChange}
                    className={complete.type.lastname ? "" : "empty"}
                />
                <label>Your first name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.firstname}
                    value={address.firstname}
                    onChange={handleChange}
                    className={complete.type.firstname ? "" : "empty"}
                />
                <label>Street name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.streetname}
                    value={address.streetname}
                    onChange={handleChange}
                    className={complete.type.streetname ? "" : "empty"}
                />
                <label>Street number:</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.streetnumber}
                    value={address.streetnumber}
                    onChange={handleChange}
                    className={complete.type.streetnumber ? "" : "empty"}
                />
                <label>ZIP Code</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.postalcode}
                    value={address.postalcode}
                    onChange={handleChange}
                    className={complete.type.postalcode ? "" : "empty"}
                />
                <label>City name</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.city}
                    value={address.city}
                    onChange={handleChange}
                    className={complete.type.city ? "" : "empty"}
                />
                <div id="question-address">
                    <input
                        type="checkbox"
                        onChange={() => set2Addresses((prev) => !prev)}
                    />
                    <label>I have a different billing address</label>
                </div>
            </form>
            <button
                className="next"
                type="button"
                onClick={() => nextPage(address)}
            >
                Next <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Shipping;
