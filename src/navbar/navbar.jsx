import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

const NavbarMenu = (props) => {
    if(props.role=='admin'){
        return (
          <Navbar bg='turquoise' expand='lg'>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav' className='navbar'>
              <Nav className='mr-auto'>
                <NavDropdown title='меню' id='basic-nav-dropdown'>
                  <NavDropdown.Item className='navbar-item' href='/'>Головна</NavDropdown.Item>
                  <NavDropdown.Item className='navbar-item' href='/drive'>Замовити подорож</NavDropdown.Item>
                  <NavDropdown.Item className='navbar-item' href='/users'>Користувачі</NavDropdown.Item>
                  <NavDropdown.Item className='navbar-item' href='/profile'>Профіль</NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }if(props.role=='dispatcher'){
        return (
            <Navbar bg='turquoise' expand='lg'>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav' className='navbar'>
                <Nav className='mr-auto'>
                  <NavDropdown title='меню' id='basic-nav-dropdown'>
                    <NavDropdown.Item className='navbar-item' href='/'>Головна</NavDropdown.Item>
                    <NavDropdown.Item className='navbar-item' href='/drive'>Замовити подорож</NavDropdown.Item>
                    <NavDropdown.Item className='navbar-item' href='/dispatchers'>Розглянути заявки</NavDropdown.Item>
                    <NavDropdown.Item className='navbar-item' href='/profile'>Профіль</NavDropdown.Item>
                    <NavDropdown.Divider />
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }else{
      return (
        <Navbar bg='turquoise' expand='lg'>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='navbar'>
            <Nav className='mr-auto'>
              <NavDropdown title='меню' id='basic-nav-dropdown'>
                <NavDropdown.Item className='navbar-item' href='/'>Головна</NavDropdown.Item>
                <NavDropdown.Item className='navbar-item' href='/drive'>Замовити подорож</NavDropdown.Item>
                <NavDropdown.Item className='navbar-item' href='/profile'>Профіль</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
    }
  };

export default NavbarMenu;