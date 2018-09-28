import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Notification = props => (
        <Message style={{ position: 'fixed', width: '10%', left: '10px', top: '50px' }} color='violet'>{ props.message }</Message>
)

export default Notification;
