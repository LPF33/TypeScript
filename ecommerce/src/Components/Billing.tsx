import * as React from "react";
import "./Billing.css";
import { Link } from "react-router-dom";

type TPayMethod = "credit" | "debit" | "invoice" | "";

const Billing: React.FC = () => {
    const [payMethod, setPayMethod] = React.useState<TPayMethod>("");

    const setPay = (e: any) => {
        setPayMethod(e.target.value);
    };

    return (
        <div id="billing">
            <Link to="/shoppingcart" className="back">
                <i className="fas fa-chevron-left"></i> Go back to bag
            </Link>
            <form id="billing-container">
                <h3>Billing</h3>
                <div className="billing-choice">
                    <div>
                        <input
                            type="radio"
                            value="credit"
                            checked={payMethod === "credit"}
                            onChange={setPay}
                        />
                        <label>Pay with credit card</label>
                    </div>
                    <br></br>
                    {payMethod === "credit" && (
                        <div>
                            <p>
                                Pay with your credit card. Enter your payment
                                details and you will be charged as soon as it
                                leaves our warehouse.
                            </p>
                        </div>
                    )}
                </div>
                <div className="billing-choice">
                    <div>
                        <input
                            type="radio"
                            value="invoice"
                            checked={payMethod === "invoice"}
                            onChange={setPay}
                        />
                        <label>Pay later (per invoice)</label>
                    </div>
                    <br></br>
                    {payMethod === "invoice" && (
                        <div>
                            <p>
                                Pay after delivery for the items you want to
                                keep. You'll get an invoice once your order has
                                left our warehouse and have 14 days to pay. You
                                just have to enter your date of birth.
                            </p>
                        </div>
                    )}
                </div>
                <div className="billing-choice">
                    <div>
                        <div>
                            <input
                                type="radio"
                                value="debit"
                                checked={payMethod === "debit"}
                                onChange={setPay}
                            />
                            <label>Pay with debit card</label>
                        </div>
                        <br></br>
                        {payMethod === "debit" && (
                            <div>
                                <p>
                                    Pay with your debit card. Enter your bank
                                    details and you will be charged as soon as
                                    it leaves our warehouse.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Billing;
