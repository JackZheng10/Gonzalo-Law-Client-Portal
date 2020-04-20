import React, {useState} from 'react';
import {Button, Header, Modal, Form, Rail} from 'semantic-ui-react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const NewEvent = (props) => {

const [title, setTitle] = useState("");
const [startDate, setStartDate] = useState(new Date);
const [summary, setSummary] = useState("");
const [open, setOpen] = useState(false);

const handleSubmit = () => {
    setOpen(false);
    setStartDate(new Date);
    setTitle("");
    setSummary("");
    //export event with startdate and title
}
const handleCancel = () => {
    setOpen(false);
    setStartDate(new Date);
    setTitle("");
    setSummary("");
}
const handleChange = (e, date) => {
    if(e.target.name==="title") 
        setTitle(e.target.value);
    if(e.target.name==='summary')
      setSummary(e.target.value);
  };

    
  return(
    <Rail position='right' close dividing>
      <Modal trigger={<Button fluid color='orange' onClick={()=>setOpen(true)}>Add Event</Button>}
      open={open} onClose={handleCancel}
      >
        <Header content='New Event'/>
        <Modal.Content>
            <Form error={false}>
            <Form.Input
                label='Event Title'
                name="title"
                placeholder="Enter a name for this event"
                required
                onChange={handleChange}
            />
            <Form.Input 
            label = "Event summary"
            name='summary'
            placeholder="Describe this event"
            onChange={handleChange}
            />
            <h5>Date</h5>
            <DatePicker 
            name="date"
            selected={startDate}
            onChange={date => setStartDate(date)}
            placeholderText="Click to select a date"
            required
            />
            <h5>Time</h5>
            <DatePicker
            name="time"
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Click to select a time"
            required
            />
            </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button color = 'green' onClick={handleSubmit}>Save Event</Button>
      </Modal.Actions>
    </Modal>
  </Rail>
  )

}

export default NewEvent;