import React, { Component } from 'react';
import List from '../components/List';
import { Link, Redirect } from 'react-router-dom';
import './appointment.css';
import APIURL from '../helpers/environment';

interface MyProps {
    token: string | null
}

interface MyState {
    type: string;
    date: string;
    time: string;
    place: string;
    note: string;
    redirect: string | null
}

class Appointment extends React.Component<MyProps,MyState>{
    constructor(props: any) {
        super(props);

        this.state = {
            type: ``,
            date: ``,
            time: ``,
            place: ``,
            note: ``,
            redirect: null
        }}

        private handleSubmit = (e : React.FormEvent) => {
            e.preventDefault();
            fetch(`${APIURL}/appointments/create`, {
                method: 'POST',
                body: JSON.stringify({
                    type: this.state.type,
                    date: this.state.date,
                    time: this.state.time,
                    place: this.state.place,
                    note: this.state.note
                }),
                headers: new Headers ({
                    Authorization: this.props.token as string, 
                    "content-type": "application/json"
                })

        }) .then(() => this.setState({redirect: "/list"}))
    }

        // componentDidMount() {
        //     fetch('http://localhost:3000/create/appointments')
        //     .then(response => response.json())
        //     .then(data => this.setState({ }));
        // }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }
       return (
         <div className='wrapper'>
           <div className='form-wrapper'>
              <h2>Appointments</h2>
              <form onSubmit={this.handleSubmit} noValidate >
              <div className='type'>
                    <label htmlFor="type">Type</label>
                    <input type='type' name='type' onChange={(event) => {
                        this.setState({
                            type: event.target.value
                        })
                        console.log(this.state.type)
                    }}/>
                 </div>
                 <div className='date'>
                    <label htmlFor="date">Date</label>
                    <input type='date' name='date' onChange={(event) => {
                        this.setState({
                            date: event.target.value
                    })
                        console.log(this.state.date)
                    }}/>   
                    </div> 
                     <div className='time'>
                    <label htmlFor="time">Time</label>
                    <input type='time' name='time' onChange={(event) => {
                        this.setState({
                            time: event.target.value
                        })
                        console.log(this.state.time)
                    }}/>
                    </div>
                     <div className='place'>
                    <label htmlFor="place">Place</label>
                    <input type='place' name='place' onChange={(event) => {
                        this.setState({
                            place: event.target.value
                        })
                        console.log(this.state.place)
                    }}/>
                     <div className='note'>
                    <label htmlFor="note">Note</label>
                    <input type='note' name='note' onChange={(event) => {
                        this.setState({
                            note: event.target.value
                        })
                        console.log(this.state.note)
                    }}/>
                 </div>    
                    </div>   
                 <div className='add'>
                    <button>Add!</button>
                 </div>
            </form>
        </div>
     </div>
    );
   }
  }
    
export default Appointment;