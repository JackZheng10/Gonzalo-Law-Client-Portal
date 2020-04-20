import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import NavBar from "./navBar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import googleAPI from "./utils/googleAPI";
import { Button } from "semantic-ui-react";
//import Calendar from 'react_google_calendar';
import "./styles.css";



var event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'},
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};



const localizer = BigCalendar.momentLocalizer(moment);

const calendar_configuration = {
  api_key: "AIzaSyASjlbR3pZS-7KpI1BW2yTR7bYRSHEDoVg",
  calendars: [
    //general Gonzalo Law Calendar
    {
      name: "Gonzalo Law Client Portal Calendar",
      url: "5l58r8nmc4knqdmgt2e37jm35s@group.calendar.google.com"
    },
    //client specific calendar
    {
      name: "Test",
      url: "tkdc3r5c8ep7lrn9t6modm7so4@group.calendar.google.com"
    }
  ],
};





export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }


  componentDidMount = () => {
    if (calendar_configuration) {
      this.getGoogleCalendarEvents();
    } else {
      console.log(
        "React Google Calendar requires you pass a configuration object"
      );
    }
  };

  getGoogleCalendarEvents = () => {
    googleAPI.getAllCalendars(calendar_configuration)
      .then(events => {
        this.setState({ events })
      })
      .catch(err => { throw new Error(err) })
  }





  render = () => (
    <div>
      <NavBar />
      <div>
      <h2 className="ui centered header basic segment">Calendar</h2>
      <div class="ui grid right aligned padded">
        <div class="ui twelve wide column">
          <div className = "ui right dividing close rail padded">

              <Button  fluid color="orange"
              href="https://calendar.google.com/calendar?cid=NWw1OHI4bm1jNGtucWRtZ3QyZTM3am0zNXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
              target="_blank"
              //onClick = {this.handleAuthClick}
              >
                edit event
                </Button>

            </div>
          <BigCalendar
            localizer={localizer}
            events={this.state.events}
            style={{ height: "100vh" }}
          />
        </div>
      </div>
      </div>
    </div>

  );
}
//edit events only possible for admin, but they have to do it through google
