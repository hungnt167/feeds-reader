

import ReactDOM from "react-dom";
import React, {Component} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import {Link} from "react-router-dom";

class NewsDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRequesting: false,
            news: false,
        };
    }

    componentDidMount() {
        this.setState({ isRequesting: true });
        axios.get(`/api/newsList/${this.props.match.params.id}`).then(response => {
            this.setState({
                news: response.data
            })
        }).catch(reason => {
            toast.error(reason)
        }).finally(() =>  this.setState({ isRequesting: false }))
    }

    render(){
        const {news} = this.state;
        const {channel} = news;

        if (!channel)  return null;

        return (
            <div className="row">
                <div className="blog-post">
                    <Link to={`/`} className="btn btn-sm">
                        &laquo; Back to previous page
                    </Link>
                    <h2 className="blog-post-title">{news.title}</h2>
                    <p className="blog-post-meta">{news.pubDate} by <a href="#">{channel.generator}</a></p>
                    <div dangerouslySetInnerHTML={{__html: news.description}}/>
                    <hr/>
                </div>
            </div>
        )
    }
}
export default NewsDetail;
