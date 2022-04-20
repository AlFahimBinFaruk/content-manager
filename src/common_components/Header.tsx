import { useState } from "react";
//MDB Components
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

//Header component
const Header = () => {
  //navbar toggler for mobile view
  const [navbarToggler, setNavbarToggler] = useState(false);
  //nav link classes
  //  const navLinkClasses  = ( isActive:object ) => {
  //   return isActive.isActive ? "text-danger" : "normal";
  // };
  //see if the use is logged in
  let login = true;

  //routes
  const routes = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/account-settings",
      name: "Account Settings",
    },
  ];

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarCenteredExample"
          aria-controls="navbarCenteredExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setNavbarToggler(!navbarToggler)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse
          navbar
          show={navbarToggler}
          center
          id="navbarCenteredExample"
          className="my-4"
        >
          <MDBNavbarNav fullWidth={false} className="mb-2 mb-lg-0">
            {login ? (
              <>
                {routes.map((route, index) => {
                  return (
                    <MDBNavbarItem key={index}>
                      <MDBNavbarLink className="fw-bold">
                        <NavLink
                          to={route.link}
                          className={({ isActive }) =>
                            isActive ? "text-dark" : "text-muted"
                          }
                        >
                          {route.name}
                        </NavLink>
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                  );
                })}
              </>
            ) : (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink className="fw-bold text-dark">
                    Login
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
