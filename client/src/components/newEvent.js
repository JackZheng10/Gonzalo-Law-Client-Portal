import React, { useState } from "react";
import { Button, Header, Modal, Form, Rail } from "semantic-ui-react";
import axios from "axios";
import DatePicker from "react-datepicker";
import baseURL from "../baseURL";
import "react-datepicker/dist/react-datepicker.css";

const NewEvent = (props) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleSubmit = () => {
    axios.defaults.headers.common["token"] = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    let date = startDate;
    let userCalendarID = localStorage.getItem("userCalendarID");

    axios
      .post(baseURL + "addCalendarEvent", {
        date,
        startTime,
        endTime,
        title,
        userCalendarID,
      })
      .then(async (res) => {
        if (res.data.success) {
          alert("Event added successfully.");
          props.refreshEvents();
        } else {
          alert("Error with adding event. Please try again.");
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });

    setStartDate(new Date());
    setStartTime(new Date());
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setStartDate(new Date());
    setTitle("");
  };

  return (
    <Rail position="right" close dividing>
      <Modal
        trigger={
          <Button fluid color="orange" onClick={() => setOpen(true)}>
            Add Event
          </Button>
        }
        open={open}
        onClose={handleCancel}
      >
        <Header content="New Event" />
        <Modal.Content>
          <Form error={false}>
            <Form.Input
              label="Event Title"
              name="title"
              selected={title}
              placeholder="Enter a name for this event"
              required
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <h5>Date</h5>
            <DatePicker
              name="date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Click to select a date"
              required
              dateFormat="yyyy/MM/dd"
            />
            <h5>Start Time</h5>
            <DatePicker
              name="time"
              selected={startTime}
              onChange={(time) => setStartTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              placeholderText="Click to select a time"
              required
              dateFormat="h:mm aa"
            />
            <h5>End Time</h5>
            <DatePicker
              name="time"
              selected={endTime}
              onChange={(time) => setEndTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              placeholderText="Click to select a time"
              required
              dateFormat="h:mm aa"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={handleSubmit}>
            Save Event
          </Button>
        </Modal.Actions>
      </Modal>
    </Rail>
  );
};

export default NewEvent;
