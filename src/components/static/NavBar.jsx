import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

const navStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  backgroundColor: "#ffffff",
};

const Navigation = () => {
  return (
    <Navbar
      collapseOnSelect
      className="py-0 font-lexend w-full px-3 m-0 min-h-[8vh] bg-white border-acm-blue border-b-4 flex justify-between items-center"
      expand="md"
      fixed="top"
      style={navStyles}
    >
      <Navbar.Brand className="p-0">
        <Link eventkey="1" href="/">
          <span className=" mb-2 px-2 no-underline ml-auto text-lg font-bold whitespace-nowrap bg-transparent text-green-900 ">
            {" "}
            OMEGA INITIATIVE
          </span>
          <span
            className="px-2 block text-sm text-greem-500 italic text-xs m-0"
            style={{
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
          >
            Air quality data, Ontario
          </span>{" "}
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mb-2 w-12/12 no-underline ml-auto text-2xl">
          <Nav.Link
            as={Link}
            eventkey="7"
            href=""
            className="py-2 px-8 no-underline ml-auto text-lg font-bold whitespace-nowrap bg-transparent text-green-900 border-2 border-solid border-green-900 rounded-md hover:border-green-700 hover:text-green-700"
            style={{
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
          >
            SIGN IN
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
