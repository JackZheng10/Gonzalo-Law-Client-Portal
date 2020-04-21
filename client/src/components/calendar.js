import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import NavBar from "./navBar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import googleAPI from "./utils/googleAPI";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";
//import Calendar from 'react_google_calendar';
import "./styles.css";
import NewEvent from "./newEvent.js";
//import checkToken from "../checkToken.js";
import jwtDecode from "jwt-decode";
import axios from "axios";
import baseURL from "../baseURL";

const localizer = BigCalendar.momentLocalizer(moment);

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      openAuthorization: false,
      authURL: "",
      authCode: "",
      openPublicCalendar: false,
    };
  }

  componentDidMount = async () => {
    //todo: create a new calendar after authorization for the user and add it to the user's

    const data = jwtDecode(localStorage.getItem("token"));

    axios.defaults.headers.common["token"] = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    if (data.isAdmin) {
      console.log("1");
      await axios
        .get(baseURL + "authorizeCalendar")
        .then(async (res) => {
          if (res.data.success) {
            //alert("Token already set");
            const selectedUser = localStorage.getItem("userEmail");
            console.log("2");
            await axios
              .post(baseURL + "getCalendarID", { selectedUser })
              .then(async (res) => {
                if (res.data.success) {
                  localStorage.setItem("userCalendarID", res.data.message);
                  console.log("3");
                  //alert("calendar ID: " + res.data.message);
                } else {
                  alert("Error with fetching calendar ID: " + res.data.message);
                }
              })
              .catch((error) => {
                alert("Error: " + error);
              });
            console.log("4");
            this.getGoogleCalendarEvents();
          } else {
            this.setState({
              authURL: res.data.message,
              openAuthorization: true,
            });
          }
        })
        .catch((error) => {
          alert("Error: " + error);
        });
    }
  };

  getGoogleCalendarEvents = () => {
    console.log("5");
    let calendarID = localStorage.getItem("userCalendarID");
    googleAPI
      .getAllCalendars({
        api_key:
          process.env.GOOGLE_CAL_APIKEY ||
          require("../config.js").googleCalendarAPIKey,
        calendars: [
          {
            name: "User Calendar",
            url: calendarID,
          },
        ],
      })
      .then((events) => {
        console.log("6");
        this.setState({ events });
      })
      .catch((err) => {
        this.setState({ openPublicCalendar: true });
      });
  };

  handleAuthSubmit = async () => {
    let code = this.state.authCode;
    await axios
      .post(baseURL + "createCalendarToken", { code })
      .then(async (res) => {
        if (res.data.success) {
          alert("Successfully authenticated.");
          const selectedUser = localStorage.getItem("userEmail");

          await axios
            .post(baseURL + "getCalendarID", { selectedUser })
            .then(async (res) => {
              if (res.data.success) {
                localStorage.setItem("userCalendarID", res.data.message);
                //alert("calendar ID: " + res.data.message);
              } else {
                alert("Error with fetching calendar ID: " + res.data.message);
              }
            })
            .catch((error) => {
              alert("Error: " + error);
            });
          this.setState({ openAuthorization: false });
        } else {
          alert("There was an error with authentication. Please try again.");
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });

    this.getGoogleCalendarEvents();
  };

  handlePublicCalClose = () => {
    this.setState({ openPublicCalendar: false }, () => {
      this.getGoogleCalendarEvents();
    });
  };

  adminView = () => {
    const data = jwtDecode(localStorage.getItem("token"));

    if (data.isAdmin) {
      return <NewEvent refreshEvents={this.getGoogleCalendarEvents} />;
    }
  };

  render = () => (
    <div>
      <NavBar />
      <Modal size="small" open={this.state.openAuthorization}>
        <Header
          icon="exclamation circle"
          color="orange"
          content="Authorization Required"
        />
        <Modal.Content>
          <p>
            Please visit this link to allow access to your Google calendar in
            order to add and remove events:{" "}
            <a href={this.state.authURL} target="_blank">
              Click here
            </a>
          </p>
          <p>
            Once done, input the code you receive below. (insert pic with
            instructions)
          </p>
          <Form.Input
            placeholder="Enter code"
            onChange={(event) => {
              this.setState({ authCode: event.target.value });
            }}
            value={this.state.authCode}
            required
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleAuthSubmit}>
            <Icon name="checkmark" /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal size="small" open={this.state.openPublicCalendar}>
        <Header
          icon="exclamation circle"
          color="orange"
          content="Public Calendar Required"
        />
        <Modal.Content>
          <p>
            Please visit{" "}
            <a href="https://calendar.google.com/calendar/" target="_blank">
              this
            </a>{" "}
            link, navigate to the calendar titled{" "}
            {<strong>{localStorage.getItem("userEmail")}</strong>}, and in its
            settings, make it public.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handlePublicCalClose}>
            <Icon name="checkmark" /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
      <div>
        <h2 className="ui centered header basic segment">Calendar</h2>
        <div class="ui grid right aligned padded">
          <div class="ui twelve wide column">
            {this.adminView()}
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
