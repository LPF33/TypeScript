export const checkName = (name: string): [boolean, string] => {
    if (name.match(/^([A-Za-z0-9-,._']){2,15}$/i)) {
        return [true, ""];
    } else {
        return [
            false,
            "Name: length: 2-15 cahracters, all alphabetical characters, numbers, and following special characters:[-,._'] allowed.",
        ];
    }
};
