/*
 * Copyright (c) 2019. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

import ReactDOM from "react-dom";
import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class ChannelTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: props.dataSource,
        }
    }

    render(){
        const {dataSource} = this.state;

        return (
            <div className="container">
                <BootstrapTable data={dataSource} version='4'>
                    <TableHeaderColumn isKey dataField='id' width={'5%'}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='title' width={'50%'}>Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='generator' width={'25%'}>Generator</TableHeaderColumn>
                    <TableHeaderColumn dataField='pubDate' width={'20%'}>Public Date</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default ChannelTable;
