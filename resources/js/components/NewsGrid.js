import ReactDOM from "react-dom";
import React, {Component, Fragment} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { LazyImage } from "react-lazy-images";
import {Link} from 'react-router-dom'

class NewsGrid extends Component {
    constructor() {
        super();
        this.state = {
            channels: [],
            isRequesting: false,
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
        const imageUrl = channel.image ? channel.image.url : "";
        return (
            newsList.map((newsSet, index) => (
                <div className="col-md-6 jasgrid" key={index}>
                    {
                        newsSet.map((news, key) => (
                            <div className="box-item" key={key}>
                                <div className="box-post">
                                    <span className="label label-success">
                                         <Link to={`/news/${news.id}`}>
                                            {channel.title}
                                         </Link>
                                    </span>
                                    <h1 className="post-title">
                                        <Link to={`/news/${news.id}`}>
                                            {news.title}
                                        </Link>
                                    </h1>
                                    <span className="meta">
                                        <span>
                                            <i className="glyphicon glyphicon-comment"/>
                                             <Link to={`/news/${news.id}`}>
                                               {news.comments ? news.comments : 'No'} Comments
                                             </Link>
                                        </span>
                                        <span>
                                            <i className="glyphicon glyphicon-time"/>{news.pubDate}
                                        </span>
                                    </span>
                                </div>
                                <LazyImage
                                    src={`https://loremflickr.com/555/300?random=${Date.now() + index}`}
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
            <div className="row">
                {
                    channels.map((channel, index) => (
                        <Fragment key={index}>{this.channelTemplate(channel)}</Fragment>
                    ))
                }
            </div>
        )
    }
}

export default NewsGrid;
