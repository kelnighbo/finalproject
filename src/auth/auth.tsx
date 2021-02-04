import React from 'react';
import Login from './Login';
import Signup from './Signup';
import './login.css';
import './signup.css';

interface LoginCheck {
    login: boolean
}

interface AcceptedProps {
    updateToken: (token: string) => void
}

class Auth extends React.Component <AcceptedProps, LoginCheck> {
    constructor (props:AcceptedProps) {
        super(props)
        this.state= {
            login: true
        } 
    }
    loginToggle=(event: React.MouseEvent) => {
        event.preventDefault() 
        this.setState({...this.state,
        login: !this.state.login})
    }
    authFields=() => 
    !this.state.login ? (
        <Signup updateToken={this.props.updateToken}/>
    ): (
        <Login updateToken={this.props.updateToken}/>
    ); 
    render(){
        return(<div>
        <div className='wrapper'>
           <div className='form-wrapper'>
            {this.authFields()}
            <div style={{display:'flex', flexDirection: 'row'}}>
            <h3>{!this.state.login ? "Already a Member?" : "New Member?"}</h3>
            <a href="#" onClick={this.loginToggle}> 
                {!this.state.login ? "login" : "signup"}
            </a>
            </div>
            </div>
            </div>
        </div>) 
    }

} 

export default Auth;