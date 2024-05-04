import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, CardHeader, Row, Col } from 'reactstrap';
import i18n from 'meteor/universe:i18n';
import ChainStates from '../components/ChainStatesContainer.js';

const T = i18n.createComponent();

export default class ChainInfo extends Component{
    constructor(props){
        super(props);
    };

    render(){
        return (
          <div className="">
            <ChainStates />
          </div>
        );
    }
}