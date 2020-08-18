import * as React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
    margin: 10px;
`;

const Links = styled(Link)`   
    margin: 0 10px;
    background: transparent;
    border: 3px solid black;
    border-radius: 20px;
    padding: 10px;
    color: black;
    font-size: 1.2em;
    cursor: pointer;
    text-decoration: none;

    :hover{
        color: white;
        border-color: white;
    }
`;

const Navbar: React.FC = () => {
    return(
        <Nav>
            <Links to="/planets">Planets</Links>
            <Links to="/people">People</Links>
        </Nav>
    )
};

export default Navbar;