import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/userActions';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


class CustomNavbar extends Component {

   state = {
      isOpen: false
   };

   toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
   }

   handleSignout = () => {
     this.props.signOut();
   }

   render() {
    const { user } = this.props.user;
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">One Cart</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {user 
            ?
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink onClick={this.handleSignout}>Sign Out</NavLink>
              </NavItem>
            </Nav>
            :
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/signup">Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signin">Sign In</NavLink>
              </NavItem>
            </Nav>
            }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
   console.log(state);  
   return {
      item: state.item,
      user: state.user
   }
};

export default connect(
   mapStateToProps, 
   { signOut }
   )(CustomNavbar); 
