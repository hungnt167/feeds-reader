import ReactDOM from "react-dom";
import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from "axios";
import { toast } from 'react-toastify';

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
    mode: 'checkbox'
};

class NewsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRequesting: false,
            dataSource: props.dataSource,
        };

        this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
        this.onAfterSaveCell = this.onAfterSaveCell.bind(this);

        this.tableOption = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [ {
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: 9999
            } ], // you can change the dropdown list for size per page
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'both',  // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            afterDeleteRow: this.onAfterDeleteRow,
        };

        this.cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell,
        };

    }

    descriptionFormat(cell, row) {
        return (<div dangerouslySetInnerHTML={{__html: row.description}}/>);
    }

    renderShowsTotal(start, to, total) {
        return (
            <p style={ { color: 'blue' } }>
                From { start } to { to }, totals is { total }
            </p>
        );
    }

    onAfterSaveCell(row, cellName, cellValue) {
        this.setState({ isRequesting: true });
        axios.put(`/api/newsList/${row['id']}`, { [cellName]:cellValue }).then(response => {
            toast.success("Updated");
        }).catch(reason => {
            toast.success(reason)
        }).finally(() =>  this.setState({ isRequesting: false }))
    }

    onAfterDeleteRow(rowKeys) {
        this.setState({ isRequesting: true });
        axios.delete(`/api/newsList/${rowKeys}`).then(response => {
            this.props.onDelete && this.props.onDelete();
            toast.success('Deleted News id: ' + rowKeys);
        }).catch(reason => {
            toast.error(reason)
        }).finally(() =>  this.setState({ isRequesting: false }))
    }

    render(){
        const {dataSource} = this.state;
        return (
            <div className="container">
                <BootstrapTable
                    data={dataSource}
                    version='4'
                    options={this.tableOption}
                    pagination={ true }
                    cellEdit={ this.cellEditProp }
                    deleteRow={ true }
                    selectRow={ selectRowProp }
                >
                    <TableHeaderColumn isKey dataField='id' width={'5%'} dataSort={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='title'
                        width={'25%'}
                    >Title
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='description'
                        dataFormat={this.descriptionFormat}
                        width={'55%'}
                    >
                        Description
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='pubDate'
                        width={'15%'}
                        dataSort={ true }>
                        Public Date
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default NewsTable;
