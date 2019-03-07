/*
 * Copyright (c) 2019. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

import ReactDOM from "react-dom";
import React, {Component} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';


class FetchChannel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isRequesting: false,
        };
    }


    /**
     *
     * @param url
     */
    fetch(url) {
        if (!url || !url.length) {
            return;
        }

        this.setState({ isRequesting: true });
        axios.post(`/api/channels/fetch`, { url })
            .then(response => {
                toast.success("Fetched");
            })
            .catch(reason => {
                toast.error(reason)
            })
            .finally(() =>  this.setState({ isRequesting: false }))
    }

    render(){
        const {isRequesting, url} = this.state;
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">Feeds Reader Function</div>
                    <div className="card-body">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            this.fetch(this.state.url);
                        }} >
                            <div className="form-group">
                                <input type="url" className="form-control" id="url"
                                       disabled={isRequesting}
                                       value={url}
                                       onChange={(e) => this.setState({ url: e.target.value })}
                                       placeholder="Enter URL"/>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isRequesting}>Fetch</button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}
export default FetchChannel;
