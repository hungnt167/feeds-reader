import ReactDOM from "react-dom";
import React, {Component, Fragment} from 'react';
import axios from 'axios'
import _ from 'lodash'
import { LazyImage } from "react-lazy-images";
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import NewsGrid from "./NewsGrid";
import NewsDetail from "./NewsDetail";
import Dashboard from "./Dashboard";
import FetchChannel from "./FetchChannel";

class Body extends Component {
    constructor() {
        super();
        this.state = {
            isRequesting: false,
            channels: [],
        }
    }

    componentDidMount() {
        this.setState({ isRequesting: true });
        axios.get('/api/channels').then(response => {
            this.setState({
                channels: response.data
            })
        }).catch(reason => {
            toast.error(reason)
        }).finally(() =>  this.setState({ isRequesting: false }))
    }

    /**
     *
     * @param channel
     * @returns {*}
     */
    channelTemplate(channel) {
        const newsList = _.chunk(channel.news_list, 2);
        const imageUrl = channel.image.url;
        return (
            newsList.map((newsSet, index) => (
                <div className="col-md-6 jasgrid" key={index}>
                    {
                        newsSet.map((news, key) => (
                            <div className="box-item" key={key}>
                                <div className="box-post">
                                    <span className="label label-success">
                                        <a href="#" rel="tag">{channel.title}</a>
                                    </span>
                                    <h1 className="post-title">
                                        <a href="#">{news.title}</a>
                                    </h1>
                                    <span className="meta">
                                        <span>
                                            <i className="glyphicon glyphicon-comment"/>
                                            <a href={news.link}>
                                                {news.comments ? news.comments : 'No'} Comments
                                            </a>
                                        </span>
                                        <span>
                                            <i className="glyphicon glyphicon-time"/>{news.pubDate}
                                        </span>
                                    </span>
                                </div>
                                <LazyImage
                                    src={`https://loremflickr.com/555/694?random=${Date.now() + index}`}
                                    alt={news.title}
                                    placeholder={({ imageProps, ref }) => (
                                        <img ref={ref} src={imageUrl} alt={imageProps.alt} />
                                    )}
                                    actual={({ imageProps }) => <img {...imageProps} />}
                                />
                            </div>
                        ))
                    }
                </div>
            ))
        )
    }

    render() {
        const {channels} = this.state;

        return (
            <div className="container">
                <Switch>
                    <Route exact path='/' component={NewsGrid} />
                    <Route path='/news/:id' component={NewsDetail} />
                    <Route path='/management' component={Dashboard} />
                    <Route path='/fetch-channel' component={FetchChannel} />
                </Switch>
            </div>
        )
    }
}

export default Body;
