import React from "react";
import { Link, NavLink } from "react-router-dom";
const NavMobile = (props) => {
  return (
    <nav className="nav-link-mobile-box">
      <ul>
        <li onClick={() => props.isMobile && props.closeMobileMenu()}>
          <NavLink
            as={Link}
            className="nav-link-mobile"
            to="/"
            activeclassname="active"
          >
            Home
          </NavLink>
        </li>
        <li onClick={() => props.isMobile && props.closeMobileMenu()}>
          <NavLink
            as={Link}
            className="nav-link-mobile"
            to="/events"
            activeclassname="active"
          >
            Events
          </NavLink>
        </li>
        <li onClick={() => props.isMobile && props.closeMobileMenu()}>
          <NavLink
            className="nav-link-mobile"
            activeclassname="active"
            as={Link}
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li onClick={() => props.isMobile && props.closeMobileMenu()}>
          <NavLink
            className="nav-link-mobile"
            activeclassname="active"
            as={Link}
            to="/contact"
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMobile;
