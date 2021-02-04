import React from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Auth from './auth/auth';
import Appointment from './auth/appointment';
import Calendar from './auth/Calendar';
import Navbar from './components/Navbar';
import List from './components/List';
import Account from './components/Account'

// import styled, { css } from 'styled-components';


class App extends React.Component<{}, { token: string | null }> {
   constructor(props: any) {
      super(props)
      this.state = {
         token: null

      }
      this.getToken = this.getToken.bind(this)
      this.updateToken = this.updateToken.bind(this)
   }
   getToken() {
      return this.state.token
   }
   updateToken(userToken: string) {
      this.setState({ token: userToken })
   }
   deleteToken() {
      this.setState({ token: null })
   }
   
   render() {
      const loggedIn = this.state.token
      let display;
      if (loggedIn) {
         display =
            (<div>
               <div className="wrapper">
                  <h1>BE AWESOME TODAY</h1>
                  <Calendar updateToken={this.updateToken} />
                  <Route path='/list'><List token={this.state.token} /></Route>
               </div>
               <Route path='/appointment'><Appointment token={this.state.token} /></Route>
            </div>
            )
      }
      else { display = <Auth updateToken={this.updateToken} /> }
      return (

         <div>
            <Router>
               <div>
                  <Navbar />
                  <Route path='/account'><Account updateToken={this.updateToken} /></Route>
               </div>
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