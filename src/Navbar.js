import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { FiDatabase } from "react-icons/fi";

const NavigationBar = (props) => {
  return (
    <div>
      <Navbar color="faded" light className="navBar">
        <NavbarBrand href="/" className="mr-auto">
          <FiDatabase></FiDatabase> Convert Data to Chart
        </NavbarBrand>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
