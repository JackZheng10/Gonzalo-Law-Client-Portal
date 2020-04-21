import React, { useState } from 'react';
import { Button, Header, Modal, Form, Rail, Segment, Item } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import Moment from 'react-moment';

import "react-datepicker/dist/react-datepicker.css";


const ViewEvent = (props) => {

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
            <Button color='red'>Delete Event</Button>
        </Segment>
    );

}

export default ViewEvent;