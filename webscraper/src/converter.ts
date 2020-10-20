import fs from "fs";
import { getResults } from "./scraper";

export const convertToJson = async (): Promise<void> => {
    let results = await getResults();
    let jsonString: string = JSON.stringify(results);
    fs.writeFile("./output.json", jsonString, (err) => {
        if (err) {
            console.log(err);
        }
    });
};
