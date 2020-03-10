import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import NavBar from "./navBar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import googleAPI from "./utils/googleAPI";

const localizer = BigCalendar.momentLocalizer(moment);

const calendar_configuration = {
  api_key: "AIzaSyDr-pqYFrEAmCFAjeo3AavrqTQFSjJ9Gio",
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
