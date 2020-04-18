import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import NavBar from "./navBar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import googleAPI from "./utils/googleAPI";
//import Calendar from 'react_google_calendar';

const localizer = BigCalendar.momentLocalizer(moment);

const calendar_configuration = {
  api_key: "AIzaSyCSey_SBTUELD3BZQpj2Y_R7gUOlPsLE6I",
  calendars: [
    {
      name: "demo",
      url: "exampleURL@group.calendar.google.com"
    }
  ],
  dailyRecurrence: 700,
  weeklyRecurrence: 500,
  monthlyRecurrence: 20
};

// const getGoogleCalendarEvents  = () => {
//   let that = this;
//   function start() {
//     gapi.client.init({
//       'apiKey': 'AIzaSyCSey_SBTUELD3BZQpj2Y_R7gUOlPsLE6I'
//     }).then(function() {
//       return gapi.client.request({
//         'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
//       })
//     }).then( (response) => {
//       let events = response.result.items
//       that.setState({
//         events
//       }, ()=>{
//         console.log(that.state.events);
//       })
//     }, function(reason) {
//       console.log(reason);
//     });
//   }
//   gapi.load('client', start)

// }

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount = () => {
    if (calendar_configuration) {
      //this.getGoogleCalendarEvents()
    } else {
      console.log(
        "React Google Calendar requires you pass a configuration object"
      );
    }
  };

  /*
  getGoogleCalendarEvents = () => {
    googleAPI.getAllCalendars(calendar_configuration)
      .then(events => {
        this.setState({ events })
      })
      .catch(err => { throw new Error(err) })
  }
  */

  render = () => (
    <div>
      <NavBar />
      <BigCalendar
        localizer={localizer}
        events={this.state.events}
        style={{ height: "100vh" }}
      />
    </div>
  );
}
