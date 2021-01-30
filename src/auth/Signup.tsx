import React, { Component } from 'react';
import './signup.css'; 

interface signupProps {
    updateToken: (token: string) => void
}

interface signupState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


class SignUp extends React.Component<signupProps,signupState>{
    constructor(props: signupProps) {
        super(props);

        this.state = {
            firstName: ``,
            lastName: ``,
            email: ``,
            password: ``
        }}
        private handleSubmit = (e : React.FormEvent) => {
            e.preventDefault();
            this.SignUp()
        }
        SignUp = () => {
            fetch('http://localhost:3000/user/signup', {
                method: 'POST', 
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
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
              <h2>Sign Up</h2>
              <form onSubmit={this.handleSubmit} noValidate >
                 <div className='firstName'>
                    <label htmlFor="firstName">First Name</label>
                    <input type='text' name='firstName' onChange= {(event) => {
                        this.setState({
                        firstName: event.target.value
                    })
                    console.log(this.state.firstName);
                }}/>
                 </div>
                 <div className='lastName'>
                    <label htmlFor="lastName">Last Name</label>
                    <input type='text' name='lastName' onChange= {(event) => {
                        this.setState({
                            lastName: event.target.value
                        })
                        console.log(this.state.lastName);
                    }}/>
                 </div>
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
                 <div className='submit'>
                    <button type="submit">Sign Me Up!</button>
                 </div>
            </form>
        </div>
    );
   }
  }


export default SignUp;