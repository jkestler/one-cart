import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createUser } from '../../store/actions/userActions';
import { Alert, FormGroup, Form, Label, Input, Button, Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
   state = {
     username: '',
     password: '',
     passwordConfirmation: ''
   }

   handleSubmit = (e) => {
      const { email, password, passwordConfirmation } = this.state;
      e.preventDefault();
      const user = { email, password, passwordConfirmation }
      this.props.createUser(user)
   }
   
   handleChange = (e) => {
      this.setState({
         [e.target.id]: e.target.value
      })
   }
  
   render() {
      const { user, userError } = this.props.user;
      if(user.id) return <Redirect to="/" /> 
      return (
      <Container>
      <h1>Sign Up</h1>
         {userError 
         ? 
         userError.map((err, id) => { 
            return (
               <div key={id}>
               <Alert color="danger">
                  {err.msg}
               </Alert>
               </div>
         );
      })
      :
      ''
      }
      <Form onSubmit={this.handleSubmit}>
         <FormGroup>
            <Label for="email">Email: </Label>
            <Input type="email" id="email" value={this.state.content} onChange={this.handleChange} />
            <Label for="password">Password: </Label>
            <Input type="password" id="password" value={this.state.content} onChange={this.handleChange} />
            <Label for="passwordConfirmation">Confirm Password: </Label>
            <Input type="password" id="passwordConfirmation" value={this.state.content} onChange={this.handleChange} />
            <Button>Sign In</Button>
         </FormGroup>
      </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
   return {
      item: state.item,
      user: state.user
   }
};

export default connect(
   mapStateToProps, 
   { createUser }
   )(Signup); 
