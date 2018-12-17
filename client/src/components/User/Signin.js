import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signInUser } from '../../store/actions/userActions';
import { Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class Signin extends Component {
   state = {
     username: '',
     password: ''
   }

   handleSubmit = (e) => {
      const { email, password, passwordConfirmation } = this.state;
      e.preventDefault();
      const user = { email, password, passwordConfirmation }
      this.props.signInUser(user)
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
      <div>
        <h1>Sign In</h1>
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
         <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" value={this.state.content} onChange={this.handleChange}/>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" value={this.state.content} onChange={this.handleChange}/>
            <button>Sign In</button>
         </form>
      </div>
    )
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
   { signInUser }
   )(Signin); 
