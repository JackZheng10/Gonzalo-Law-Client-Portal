import React, { Component, useState } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import NavBar from "./navBar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import googleAPI from "./utils/googleAPI";
import { Button, Modal, Header } from "semantic-ui-react";
//import Calendar from 'react_google_calendar';
import "./styles.css";
import NewEvent from "./newEvent.js";
//import checkToken from "../checkToken.js";
import jwtDecode from "jwt-decode";
import ViewEvent from './viewEvent';

//all functionality is linked to this dummy data
//this file needs to be chnages so that 'events' comes from the api and selected event is the default most recent
var events = [
{
  'summary': 'Test Event 1',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2020-04-20T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2020-04-20T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    { 'email': 'lpage@example.com' },
    { 'email': 'sbrin@example.com' },
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      { 'method': 'email', 'minutes': 24 * 60 },
      { 'method': 'popup', 'minutes': 10 },
    ],
  },
},
{
  'summary': 'Test Event 2',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2020-04-20T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2020-04-20T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    { 'email': 'lpage@example.com' },
    { 'email': 'sbrin@example.com' },
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      { 'method': 'email', 'minutes': 24 * 60 },
      { 'method': 'popup', 'minutes': 10 },
    ],
  },
},
];

//*ALL the API confiuration stuff */
// const calendar_configuration = {
//   api_key: "AIzaSyASjlbR3pZS-7KpI1BW2yTR7bYRSHEDoVg",
//   calendars: [
//     //general Gonzalo Law Calendar
//     {
//       name: "Gonzalo Law Client Portal Calendar",
//       url: "5l58r8nmc4knqdmgt2e37jm35s@group.calendar.google.com"
//     },
//     //client specific calendar
//     {
//       name: "Test",
//       url: "tkdc3r5c8ep7lrn9t6modm7so4@group.calendar.google.com"
//     }
//   ],
// };
// const componentDidMount = () => {
//   if (calendar_configuration) {
//     this.getGoogleCalendarEvents();
//   } else {
//     console.log(
//       "React Google Calendar requires you pass a configuration object"
//     );
//   }
// };

// const getGoogleCalendarEvents = () => {
//   googleAPI.getAllCalendars(calendar_configuration)
//     .then(events => {
//       setEvents({ events })
//     })
//     .catch(err => { throw new Error(err) })
// }












const Calendar = (props) => {
  //const [events, setEvents] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState(events[1]);
  


  const localizer = BigCalendar.momentLocalizer(moment);
  

  const adminView = () => {
    const data = jwtDecode(localStorage.getItem("token"));

    if (data.isAdmin) {
      return (
        <NewEvent event={selectedEvent} />
      );
    }
  };

  
  const onSelectEvent = (pEvent) => {
    /*needs to pass the selected Event to */
   setSelectedEvent(pEvent);
   
    //to remove an event
    // const r = window.confirm("Would you like to remove this event?")
    // if (r === true) {

    //   this.setState((prevState, props) => {
    //     const events = [...prevState.events]
    //     const idx = events.indexOf(pEvent)
    //     events.splice(idx, 1);
    //     return { events };
    //   });
    // }

  }



  return (
    <div>
      <NavBar />
      <div>
        <h2 className="ui centered header basic segment">Calendar</h2>
        <div className="ui grid right aligned padded">
          <div className="ui twelve wide column">
            {adminView()}
            <BigCalendar
              localizer={localizer}
              events={events}
              style={{ height: "100vh" }}
              onSelectEvent={onSelectEvent} //Fires selecting existing event
            />
          </div>
        </div>
      </div>
    </div>

  );
}
export default Calendar;
//edit events only possible for admin, but they have to do it through google
