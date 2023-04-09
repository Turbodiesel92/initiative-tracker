import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Wrapper>

      <h1>Turn Tracker</h1>
      <Nav>
        <Button as={Link} to="/">
          Home
        </Button>

        <Button as={Link} to="/turntracker">
          TurnTracker
        </Button>

        <Button as={Link} to="/login">
          Login
        </Button>

        <Button as={Link} to="/playercharacter">
          PC
        </Button>

        <Button as={Link} to="/npc">
          NPC
        </Button>

        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Helvetica-BoldOblique";
  font-size: 3rem;
  color: #171FFF;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;