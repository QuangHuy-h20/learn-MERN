import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    list-style: none;
    li {
      padding: 0 16px;
    }
    a {
        font-weight:500;
      color: #fff;
      text-decoration: none;
    }
    .logout{
        img{
            margin-right:16px;
        }
  }
`;
const Menu = () => {


  const {
    authState: {
      user: { username },
    },
    logoutUser
  } = useContext(AuthContext);

  const handleLogout = () => logoutUser();
  return (
    <Navbar className="shadow px-3" expand="lg" bg="primary" variant="dark">
      <Navbar.Brand className="font-weight-bolder text-white">
        <img
          src={learnItLogo}
          alt="learn"
          width="32"
          height="32"
          className="mx-2"
        />
        Learn It
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <StyledNavbar>
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link disabled>Welcome {username}</Link>
            </li>
            <li>
              <Button
                variant="secondary"
                onClick={handleLogout}
                className="logout font-weight-bolder text-white"
              >
                <img src={logoutIcon} alt="logoutIcon" width="32" height="32" />
                Logout
              </Button>
            </li>
          </ul>
        </StyledNavbar>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
