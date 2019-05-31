import React from 'react';
import {Button} from '@material-ui/core';

const Welcome = ({email, onSignOut})=> {
    // This is a dumb "stateless" component
    return (
      <div>
        Welcome <strong>{email}</strong>!
        <a href="javascript:;" onClick={onSignOut}>Sign out</a>
      </div>
    )
  }
  
  class Logout extends React.Component {
    
    constructor(props) {
      super(props)
      // the initial application state
      this.state = {
        email: null
      }
    }
    
    signOut() {
      // clear out user from state
      this.setState({email: null})
    }
    
    render() {
      // Here we pass relevant state to our child components
      // as props. Note that functions are passed using `bind` to
      // make sure we keep our scope to App
      return (
        <div>
          { 
            (this.state.email) ? 
            <Button>
              <Welcome 
               user={this.state.user} 
               onSignOut={this.signOut.bind(this)} 
              />
            </Button>
          }
        </div>
      )
      
    }
    
  }