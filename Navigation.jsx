import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../index.css";
import { GiHamburgerMenu } from "react-icons/gi";
import NavMobile from "./NavMobile";
import { CgClose } from "react-icons/cg";

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const closeMobileMenu = () => setOpen(false);
  return (
    <nav className="header-nav">
      <div className="nav-contents">
        <NavLink to="/" as={Link} activeclassname="active">
          <h1>Winc Events</h1>
        </NavLink>
        <div className="nav-links">
          <ul>
            <li>
              <NavLink
                as={Link}
                className="header-nav-link"
                to="/"
                activeclassname="active"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                as={Link}
                className="header-nav-link"
                to="/events"
                activeclassname="active"
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                className="header-nav-link"
                activeclassname="active"
                as={Link}
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className="header-nav-link"
                activeclassname="active"
                as={Link}
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-hamburger-menu">
          {open ? (
            <CgClose
              color="white"
              fontSize={32}
              onClick={() => setOpen(!open)}
            />
          ) : (
            <GiHamburgerMenu
              color="white"
              fontSize={32}
              onClick={() => setOpen(!open)}
            />
          )}
          {open && (
            <NavMobile isMobile={true} closeMobileMenu={closeMobileMenu} />
          )}
          {}
        </div>
      </div>
    </nav>
  );
};
