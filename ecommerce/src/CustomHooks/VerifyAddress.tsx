import * as React from "react";
import { TAddress } from "../Context/State";
import { checkName, checkPostal, checkStreet } from "./HelperFunctions";

export enum EAddress {
    lastname = "lastname",
    firstname = "firstname",
    streetname = "streetname",
    streetnumber = "streetnumber",
    postalcode = "postalcode",
    city = "city",
}

export type TCompletenss = {
    complete: boolean;
    type: {
        lastname: boolean;
        firstname: boolean;
        streetname: boolean;
        streetnumber: boolean;
        postalcode: boolean;
        city: boolean;
    };
};

type TUseSetState<T> = React.Dispatch<React.SetStateAction<T>>;

function useVerifyAddress<T>(setter: TUseSetState<T>) {
    const [error, setError] = React.useState<string[]>([]);

    const validateInput = (name: string, val: string): boolean => {
        if (
            name === EAddress.lastname ||
            name === EAddress.firstname ||
            name === EAddress.streetname ||
            name === EAddress.city
        ) {
            const nameCheck = checkName(name, val);
            if (!nameCheck[0]) {
                setError([nameCheck[1]]);
                return false;
            } else {
                setError([]);
                return true;
            }
        }

        if (name === EAddress.postalcode) {
            const postalCheck = checkPostal(val);
            if (!postalCheck[0]) {
                setError([postalCheck[1]]);
                return false;
            } else {
                setError([]);
                return true;
            }
        }

        if (name === EAddress.streetnumber) {
            const streetCheck = checkStreet(val);
            if (!streetCheck[0]) {
                setError([streetCheck[1]]);
                return false;
            } else {
                setError([]);
                return true;
            }
        }

        return true;
    };

    const checkCompleteness = (address: TAddress): TCompletenss => {
        let arr: TCompletenss = {
            complete: true,
            type: {
                lastname: false,
                firstname: false,
                streetname: false,
                streetnumber: false,
                postalcode: false,
                city: false,
            },
        };

        const setCompleteType = (key: string, bool: boolean) => {
            if (key === EAddress.lastname) {
                arr.type.lastname = bool;
            } else if (key === EAddress.firstname) {
                arr.type.firstname = bool;
            } else if (key === EAddress.streetname) {
                arr.type.streetname = bool;
            } else if (key === EAddress.streetnumber) {
                arr.type.streetnumber = bool;
            } else if (key === EAddress.postalcode) {
                arr.type.postalcode = bool;
            } else if (key === EAddress.city) {
                arr.type.city = bool;
            }
        };

        for (let [key, value] of Object.entries(address)) {
            if (!value) {
                setCompleteType(key, false);
                arr.complete = false;
            } else if (!validateInput(key, value)) {
                setCompleteType(key, false);
                arr.complete = false;
            } else {
                setCompleteType(key, true);
            }
        }

        return arr;
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

    return { handleChange, error, checkCompleteness };
}

export default useVerifyAddress;
