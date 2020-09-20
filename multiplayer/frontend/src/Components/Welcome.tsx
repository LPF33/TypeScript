import * as React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Welcome.css";

const room = uuidv4();

const Welcome: React.FC = () => {
    const serverUrl =
        process.env.NODE_ENV === "development"
            ? "localhost:3000"
            : "https://loomplay.herokuapp.com";

    return (
        <div id="welcome">
            <div>LOOM Playground</div>
            <div>
                <h3>Mini-Racer</h3>
            </div>
            <div>
                Send this link to a friend:<br></br>
                {serverUrl}/miniracer/{room}
            </div>
            <Link to={`/miniracer/${room}`}>Play</Link>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
            <div className="background1"></div>
        </div>
    );
};

export default Welcome;
