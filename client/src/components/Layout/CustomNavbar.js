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
} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';


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
          <Link to="/">One Cart</Link>
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
                <NavLink to="/signup">Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="signin">Sign In</NavLink>
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
