import * as React from "react";
import { StateContext, TAddress, TContext } from "../Context/State";
import { checkName } from "./HelperFunctions";

export enum EAddress {
    lastname = "lastname",
    firstname = "firstname",
    streetname = "streetname",
    streetnumber = "streetnumber",
    postalcode = "postalcode",
    city = "city",
}

type TUseSetState<T> = React.Dispatch<React.SetStateAction<T>>;

function useVerifyAddress<T>(setter: TUseSetState<T>) {
    const [error, setError] = React.useState<string[]>([]);

    const validateInput = (name: string, val: string) => {
        if (name === EAddress.lastname) {
            const nameCheck = checkName(val);
            if (!nameCheck[0]) {
                setError([nameCheck[1]]);
            } else {
                setError([]);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;

        setter((prev) => {
            return { ...prev, [name]: value };
        });
        validateInput(name, value);
    };

    return { handleChange, error };
}

export default useVerifyAddress;
