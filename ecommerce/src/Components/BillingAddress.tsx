import * as React from "react";
import "./Shipping.css";
import { Link, useHistory } from "react-router-dom";
import { StateContext, TAddress, TContext } from "../Context/State";
import useVerifyAddress, {
    EAddress,
    TCompletenss,
} from "../CustomHooks/VerifyAddress";

const BillingAddress: React.FC = () => {
    const {
        billingAddress,
        setBillingAddress,
    } = React.useContext<TContext | null>(StateContext)!;

    const { error, handleChange, checkCompleteness } = useVerifyAddress(
        setBillingAddress
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
        if (complete.complete) {
            history.replace("/billing");
        }
    }, [complete]);

    return (
        <div id="shipping">
            <Link to="/shoppingcart" className="back">
                <i className="fas fa-chevron-left"></i> Go back to bag
            </Link>
            <form>
                <h3>Billing Address</h3>
                {error.length > 0 && <h6 className="error">{error}</h6>}
                <label>Last name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.lastname}
                    value={billingAddress.lastname}
                    onChange={handleChange}
                    className={complete.type.lastname ? "" : "empty"}
                />
                <label>First name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.firstname}
                    value={billingAddress.firstname}
                    onChange={handleChange}
                    className={complete.type.firstname ? "" : "empty"}
                />
                <label>Street name:</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.streetname}
                    value={billingAddress.streetname}
                    onChange={handleChange}
                    className={complete.type.streetname ? "" : "empty"}
                />
                <label>Street number:</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.streetnumber}
                    value={billingAddress.streetnumber}
                    onChange={handleChange}
                    className={complete.type.streetnumber ? "" : "empty"}
                />
                <label>ZIP Code</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.postalcode}
                    value={billingAddress.postalcode}
                    onChange={handleChange}
                    className={complete.type.postalcode ? "" : "empty"}
                />
                <label>City name</label>
                <input
                    type="text"
                    autoComplete="off"
                    name={EAddress.city}
                    value={billingAddress.city}
                    onChange={handleChange}
                    className={complete.type.city ? "" : "empty"}
                />
                <div id="question-address"></div>
            </form>
            <button
                className="next"
                type="button"
                onClick={() => nextPage(billingAddress)}
            >
                Next <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default BillingAddress;
