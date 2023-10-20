import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  ROUTE_HOME,
  ROUTE_PLAY_PAGE,
  ROUTE_BIKE_PAGE,
  ROUTE_ABOUT_PAGE,
} from '../../../routes/Routes';

class AppNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <Navbar
        // color="light"
        light
        expand="md"
        dark={true}
        style={{ backgroundColor: '#012D39' }}
      >
        <NavbarBrand href="/">OSM React</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to={ROUTE_HOME}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to={ROUTE_PLAY_PAGE}>
                Play
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to={ROUTE_BIKE_PAGE}>
                Bike
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to={ROUTE_ABOUT_PAGE}>
                About
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default AppNavBar;
