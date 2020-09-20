import * as React from "react";
import { TPayMethod } from "../Components/Billing";

export interface TContext {
    cart: TCart[];
    setCart: React.Dispatch<React.SetStateAction<TCart[]>>;
    address: TAddress;
    setAddress: React.Dispatch<React.SetStateAction<TAddress>>;
    sumItems: () => number;
    calcSum: () => number;
    twoAddresses: boolean;
    set2Addresses: React.Dispatch<React.SetStateAction<boolean>>;
    billingAddress: TAddress;
    setBillingAddress: React.Dispatch<React.SetStateAction<TAddress>>;
    payMethod: TPayMethod;
    setStatePayMethod: React.Dispatch<React.SetStateAction<TPayMethod>>;
}

export interface TCart {
    id: number;
    product: string;
    amount: number;
    price: number;
    image: string;
}

export interface TAddress {
    lastname: string;
    firstname: string;
    streetname: string;
    streetnumber: string;
    postalcode: string;
    city: string;
}

export const StateContext = React.createContext<TContext | null>(null!);

export default function StateProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cart, setCart] = React.useState<TCart[]>([]);
    const [address, setAddress] = React.useState<TAddress>({
        lastname: "",
        firstname: "",
        streetname: "",
        streetnumber: "",
        postalcode: "",
        city: "",
    });

    const [twoAddresses, set2Addresses] = React.useState<boolean>(false);

    const [billingAddress, setBillingAddress] = React.useState<TAddress>({
        lastname: "",
        firstname: "",
        streetname: "",
        streetnumber: "",
        postalcode: "",
        city: "",
    });

    const [payMethod, setStatePayMethod] = React.useState<TPayMethod>("");

    const calcSum = (): number => {
        let sum = 0;
        if (cart.length > 0) {
            for (let item of cart) {
                sum += item.amount * item.price;
            }
        }
        return sum;
    };

    const sumItems = (): number => {
        let sum: number = 0;
        if (cart.length > 0) {
            for (let item of cart) {
                sum += item.amount;
            }
        }
        return sum;
    };

    return (
        <StateContext.Provider
            value={{
                cart,
                setCart,
                address,
                setAddress,
                sumItems,
                calcSum,
                twoAddresses,
                set2Addresses,
                billingAddress,
                setBillingAddress,
                payMethod,
                setStatePayMethod,
            }}
        >
            {children}
        </StateContext.Provider>
    );
}
