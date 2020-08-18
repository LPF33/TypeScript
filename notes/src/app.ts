import express, {Express} from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/routes";

//.env file
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(router);

const PORT: string | number = process.env.PORT || 8080;

app.listen(PORT, ():void => console.log("Server is runnning on port",PORT));

