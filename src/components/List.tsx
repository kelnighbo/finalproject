import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Appointment from '../auth/appointment';
import APIURL from '../helpers/environment';

interface RouteComponentProps {
    token: string | null
}

interface IState {
    appointment: any[];
    redirect: string | null
}

class List extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { appointment: [], redirect: null }

    }
    fetchAppointment() {
        fetch(`${APIURL}/appointments/myappointments`, {
            method: 'GET',
            headers: new Headers({
                Authorization: this.props.token as string
            })
        }).then(result => result.json())
            .then(json => {
                console.log(json)
                this.setState({ appointment: json })
            })
    }

    deleteAppointment(id:any) {
    fetch(`${APIURL}/appointments/delete/` +id, {
        method: 'DELETE',
        headers: new Headers({
            Authorization: this.props.token as string 
        })
    })
        .then(response => {
        console.log(response);
        this.fetchAppointment()
        })
    }




componentDidMount(){
    this.fetchAppointment()
}

render() {
    const appointment = this.state.appointment;
    return (
        <div>
            {appointment.length === 0 && (
                <div className="text-center">
                    <h2>No appointment found</h2>
                </div>
            )}
            <div className="container">
                <div className="row">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Place</th>
                                <th scope="col">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointment && appointment.map(appointment =>
                                <tr key={appointment.id}>
                                    <td>{appointment.type}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.place}</td>
                                    <td>{appointment.note}</td>
                                    <td>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group" style={{ marginBottom: "10px" }}>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteAppointment(appointment.id)}>Delete</button>
                                                {/* `${}` */}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
}
export default List; 