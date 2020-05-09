import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/matching">Matching</NavLink>
      <NavLink to="/questionaire">Questionaire</NavLink>
    </nav>
  );
}
