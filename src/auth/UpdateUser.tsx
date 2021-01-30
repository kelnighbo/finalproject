import React, { Component } from 'react';

interface Mystate {
    email: string;
    password: string;
}
    class UpdateUser extends React.Component<{},Mystate> {
        constructor(props: any) {
            super(props);

            this.state = {
                email: ``,
                password: ``
            }}
        private handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        this.setState(this.state)
        }

        componentDidMount() {
        fetch('http://localhost:3000/user/updateuser') 
            .then(response => response.json())
            .then(data => this.setState({ }));
        }

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
                         <button>Update!</button>
                      </div>
                 </form>
             </div>
          </div>
            )}}
        

export default UpdateUser;