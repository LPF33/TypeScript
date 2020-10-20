import express, { Express, Request, Response } from "express";
import { getResults } from "./scraper";
import { convertToJson } from "./converter";

const app: Express = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
    try {
        await convertToJson();
        const result = await getResults();
        res.status(200);
        res.json(result);
    } catch (err) {
        res.status(500);
        res.json(err);
    }
});

const PORT: string | number = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server running on port" + PORT));
