import * as React from 'react';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import './calendar.css';

const Frame = styled.div`
  width: 400px;
  border: 1px solid lightgrey;
  box-shadow: 2px 2px 2px #eee;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f5f6fa;
`;

const Button = styled.div`
  cursor: pointer;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Day = styled.div`
  width: 14.2%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  

  ${props =>
    // @ts-ignore
    props.isToday &&
    css`
      border: 1px solid #eee;
    `}

  ${props =>
    // @ts-ignore
    props.isSelected &&
    css`
      background-color: #eee;   `}
      `
;

interface calendarProps {
    updateToken: (token: string) => void
}

interface calendarState {
    days: any;
    daysLeap: number|string|Date;
    daysOfTheWeek: number|string|Date;
    months: number|string|Date;
    today: number|string|Date;
    date: Date;
    dateNumber: number;
    day: any;
    month: any;
    year: any;
    startDay: any;

}

const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


class Calendar extends React.Component<calendarProps, calendarState> {
    constructor(props: calendarProps) {
        super(props);
        this.state = {
            days: ``,
            daysLeap: ``,
            daysOfTheWeek: ``,
            months: ``,
            today: ``,
            date: new Date(),
            dateNumber: 0,
            day: ``,
            month: ``,
            year: ``,
            startDay: ``
        }
    }
    //   const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //   const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //   const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    //   const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    //   const today = new Date();
    //   const [date, setDate] = useState(today);
    //   const [day, setDay] = useState(date.getDate());
    //   const [month, setMonth] = useState(date.getMonth());
    //   const [year, setYear] = useState(date.getFullYear());
    //   const [startDay, setStartDay] = useState(getStartDayOfMonth(date));


    componentDidMount() {
        this.setDate(this.state.date)
    }

    setDate(d:Date) {
        this.setState({ dateNumber: d.getDate() })
        this.setState({ month: d.getMonth() })
        this.setState({ year: d.getFullYear().toString() })
        this.setState({ startDay: this.getStartDayOfMonth(d) })
    }

    getStartDayOfMonth(d:Date) {
        return new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    }

    isLeapYear(year: number) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    days = this.isLeapYear(this.state.date.getFullYear()) ? DAYS_LEAP : DAYS;

    render() {
        return (
            <Frame>
                <Header>
                    <Button onClick={() => this.setState ({date: new Date(this.state.year, this.state.month - 1, this.state.dateNumber)})}>Prev</Button>
                    <div>
                        {MONTHS[this.state.month]} {this.state.year}
                    </div>
                    <Button onClick={() => this.setState({date: new Date(this.state.year, this.state.month + 1, this.state.dateNumber)})}>Next</Button>
                </Header>
                <Body>
                    {DAYS_OF_THE_WEEK.map(d => (
                        <Day key={d}>
                            <strong>{d}</strong>
                        </Day>
                    ))}
                    {Array(this.state.days[this.state.month] + (this.state.startDay - 1))
                        .fill(null)
                        .map((_, index) => {
                            const d = index - (this.state.startDay - 2);
                            return (
                                <Day
                                    key={index}
                                    // @ts-ignore
                                    isToday={d === this.state.today.getDate()}
                                    isSelected={d === this.state.day}
                                    onClick={() => this.setDate(new Date(this.state.year, this.state.month, d))}
                                >
                                    {d > 0 ? d : ''}
                                </Day>
                            );
                        })}
                </Body>
            </Frame>
        );
    }
}

export default Calendar; 