import React, { Component } from 'react';
import './App.css';
import SignUp from './auth/Signup';
import Login from './auth/Login';
import {Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Auth from './auth/auth';
import Appointment from './auth/appointment';
import Calendar from './auth/Calendar';
// import styled, { css } from 'styled-components';


class App extends React.Component<{},{token:string|null}> {
   constructor(props: any) {
      super(props)
      this.state={
         token: null

      }
      this.getToken= this.getToken.bind(this)
      this.updateToken= this.updateToken.bind(this)
   }
   getToken(){
      return this.state.token
   }
   updateToken(userToken:string) {
      this.setState({token: userToken})
   }
   deleteToken() {
      this.setState({token:null})
   }
   render() {
      const loggedIn = this.state.token
      let display; 
      if (loggedIn) {
         display = (<Appointment/>)
         } 
         else {display =  <Auth updateToken={this.updateToken}/>}
   return (

     <div>
        <div>
      <h1>Calendar</h1>
      <Calendar updateToken={this.updateToken}/>
      </div>
        <Router>
           <Switch> 
              {display}
           </Switch>
        </Router>
   </div>
   );
}
}
// const Container = styled.div`
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
// const rootElement = document.getElementById('root');
// render(<App />, rootElement);

export default App;