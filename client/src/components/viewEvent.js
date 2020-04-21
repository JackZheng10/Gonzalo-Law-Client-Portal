import React, { useState } from 'react';
import { Button, Header, Segment, Item } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import Moment from 'react-moment';
import jwtDecode from "jwt-decode";

import "react-datepicker/dist/react-datepicker.css";


const ViewEvent = (props) => {

    const showButton = () => {
        const data = jwtDecode(localStorage.getItem("token"));
    
        if (data.isAdmin) {
          return (
            <Button color='red'>Delete Event</Button>
          );
        }
    }

    const [selectedEvent, setSelectedEvent] = useState(props.event);
    return (
        <Segment color='blue'>
            <Item.Group>
                <Item>
                    <Item.Header>{selectedEvent.summary}</Item.Header>
                </Item>
                <Item>
                    <Item.Header>Date: </Item.Header>
                    <Moment format="YYYY/MM/DD">
                        {selectedEvent.start.dateTime}
                    </Moment>
                </Item>
                <Item>
                    <Item.Header>Time: </Item.Header>
                    <Moment format='LT'>{selectedEvent.start.dateTime}</Moment>
                    <text> - </text> 
                    <Moment format='LT'>{selectedEvent.end.dateTime}</Moment>
                </Item>

            </Item.Group>
            {showButton()}
        </Segment>
    );

}

export default ViewEvent;