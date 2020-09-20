export const checkName = (name: string, val: string): [boolean, string] => {
    if (val.match(/^([A-Za-z0-9 äöüÄÖÜß -,._']){2,15}$/i)) {
        return [true, ""];
    } else {
        return [
            false,
            `${name}: length: 2-15 cahracters, all alphabetical characters, numbers, and following special characters:[-,._'] allowed.`,
        ];
    }
};

export const checkPostal = (val: string): [boolean, string] => {
    if (val.match(/^\d{5}$/g)) {
        return [true, ""];
    } else {
        return [false, `Postalcode: Must contain 5 numbers!`];
    }
};

export const checkStreet = (val: string): [boolean, string] => {
    if (val.match(/^\d{1,6}[a-z]?$/gi)) {
        return [true, ""];
    } else {
        return [
            false,
            `Street-number: Must contain a number (max. 6 numbers), can contain one letter.`,
        ];
    }
};
