import React, { Component } from 'react';
import './Account.css';
import APIURL from '../helpers/environment';

interface updateProps {
    updateToken: (token: string) => void
}

interface updateState {
    email: string;
    password: string;
}

class Update extends React.Component<updateProps,updateState>{
    constructor(props: updateProps) {
        super(props);

        this.state = {
            email: ``,
            password: ``
        }}

        private handleSubmit = (e : React.FormEvent) => {
            e.preventDefault();
            this.Update();
        }

        Update = () => {
            fetch(`${APIURL}/user/updateuser`, {
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
         <div className='wrapper'>
             <div className='form-wrapper'>
              <h2>Update Account</h2>
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
                 <div className='update'>
                    <button type='submit'>Update!</button>
                    <div style={{display:'flex', flexDirection: 'row'}}></div>
                 </div>
            </form>
        </div>
        </div>
    );
   }
  }

export default Update;
