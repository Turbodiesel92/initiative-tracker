import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import { UserContext } from "./App";

function NavBar() {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  const [user, setUser] = useContext(UserContext);

  return (
    <Wrapper>
      <h1>Turn Tracker</h1>
      <Nav>
        <Button as={Link} to="/home">
          Home
        </Button>

        <Button as={Link} to="/turntracker">
          TurnTracker
        </Button>
        {user ? (
          <>
            <Button as={Link} to="/playercharacter">
              PC
            </Button>

            <Button as={Link} to="/npc">
              NPC
            </Button>

            <Button onClick={handleLogoutClick}>Logout</Button>
          </>
        ) : (
          <Button as={Link} to="/login">
            Login
          </Button>
        )}
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;

  @media (max-width: 768px) {
    position: static;
    margin-top: 16px;
  }
`;

export default NavBar;
