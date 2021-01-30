import React, { Component } from 'react';
import {Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import './login.css'; 
import '../App';

interface loginProps {
    updateToken: (token: string) => void
}

interface loginState {
    email: string;
    password: string;
}

class Login extends React.Component<loginProps,loginState>{
    constructor(props: loginProps) {
        super(props);

        this.state = {
            email: ``,
            password: ``
        }}
        private handleSubmit = (e : React.FormEvent) => {
            e.preventDefault();
            this.setState(this.state)
        }

        Login = () => {
            fetch('http://localhost:3000/user/login', {
                method: 'POST', 
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }),
                headers: new Headers({"Content-Type": "application/json"})
            })
            .then(response => response.json())
            .then((data) => {
                // localStorage.setItem('userID', data.user.ID)
                this.props.updateToken(data.sessionToken)
                console.log(data);
            });  
        };


    render() {
       return (
         <div>
              <h2>Login</h2>
              <form onSubmit={this.handleSubmit} noValidate >
              <div className='email'>
                    <label htmlFor="email">Email</label>
                    <input type='email' name='email' onChange={(event) => {
                        this.setState({
                            email: event.target.value
                        })
                        console.log(this.state.email)
                    }}/>
                 </div>
                 <div className='password'>
                    <label htmlFor="password">Password</label>
                    <input type='password' name='password' onChange={(event) => {
                        this.setState({
                            password: event.target.value
                    })

                    }}/>
                 </div>              
                 <div className='login'>
                    <button>Login!</button>
                    <div style={{display:'flex', flexDirection: 'row'}}></div>
                 </div>
            </form>
        </div>
    );
   }
  }
    
export default Login;