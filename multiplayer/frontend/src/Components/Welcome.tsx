import * as React from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

const room = v4();

const Welcome: React.FC = () => {
    return (
        <React.Fragment>
            <div>Welcome</div>
            <div>
                Send this link to a friend: localhost:3000/miniracer/{room}
            </div>
            <Link to={`/miniracer/${room}`}>Go to MiniRacer</Link>
        </React.Fragment>
    );
};

export default Welcome;
