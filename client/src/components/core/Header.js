import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { emitEvent } from "../../api/socket-api";
import { UserContext } from "../../App";
import { logout } from "../../api/user-api";

const Header = () => {
  const { loggedIn, setLoggedIn, setUserInfo, userInfo } =
    useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false); 

  const toggleNavbar = () => {
    setIsOpen(!isOpen); 
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        setLoggedIn(false);
        setUserInfo({});
        emitEvent("User Logout", userInfo.id);
        return navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar style={{ backgroundColor: "#204e59" }} expand="md">
        <NavbarBrand style={{ color: "#fff", fontSize: "2em" }}>
          Event Manager
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="ml-auto" style={{marginLeft:"5.3rem"}}>
            {!loggedIn ? (
              <div style={{ display: "flex", float: "right" }}>
                <NavItem>
                  <NavLink
                    href="/login"
                    style={{
                      fontSize: "1.4em",
                      marginRight: "1em",
                      color: `${
                        location.pathname === "/login" ? "#ff5100" : "#fff"
                      }`,
                    }}
                  >
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="/register"
                    style={{
                      fontSize: "1.4em",
                      color: `${
                        location.pathname === "/register" ? "#ff5100" : "#fff"
                      }`,
                    }}
                  >
                    Register
                  </NavLink>
                </NavItem>
              </div>
            ) : (
              <>
                <NavItem>
                  <NavLink
                    href="/dashboard"
                    style={{
                      fontSize: "1.2em",
                      color: `${
                        location.pathname === "/dashboard" ? "#ff5100" : "#fff"
                      }`,
                    }}
                  >
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="/add-event"
                    style={{
                      fontSize: "1.2em",
                      color: `${
                        location.pathname === "/add-event" ? "#ff5100" : "#fff"
                      }`,
                    }}
                  >
                    Create Event
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="/my-registrations"
                    style={{
                      fontSize: "1.2em",
                      color: `${
                        location.pathname === "/my-registrations"
                          ? "#ff5100"
                          : "#fff"
                      }`,
                    }}
                  >
                    My Registrations
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={handleLogout}
                    style={{
                      fontSize: "1.2em",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
