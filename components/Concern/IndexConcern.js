import React, { Component } from 'react';
import {DataTable} from '../Table/DataTable';


export class IndexConcern extends Component {

    constructor() {
        super();
        this.state = {};
    }


    render() {
        return (
            <div>
                <DataTable config={this.props.config} list={this.props.list} mousepointer/>
            </div>
        );
    }
}