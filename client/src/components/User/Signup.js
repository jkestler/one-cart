import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createUser } from '../../store/actions/userActions';
import { Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
   state = {
     username: '',
     password: '',
     passwordConfirmation: ''
   }
   
   componentDidMount = () => {
      const cachedHits = localStorage;
      
      if (cachedHits) {
        console.log(cachedHits)
        return;
      }
   }

   handleSubmit = (e) => {
      const { email, password, passwordConfirmation } = this.state;
      e.preventDefault();
      const user = { email, password, passwordConfirmation }
      console.log('User', user);
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
        <div>
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
         <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" value={this.state.content} onChange={this.handleChange}/>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" value={this.state.content} onChange={this.handleChange}/>
            <label htmlFor="passwordConfirmation">Confirm Password: </label>
            <input type="password" id="passwordConfirmation" value={this.state.content} onChange={this.handleChange}/>
            <button>Create User</button>
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
   { createUser }
   )(Signup); 
