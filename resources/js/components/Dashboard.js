import ReactDOM from "react-dom";
import React, {Component, Fragment} from 'react';
import axios from "axios";
import NewsTable from './NewsTable';
import ChannelTable from "./ChannelTable";
import { toast } from 'react-toastify';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            isRequesting: false,
            channels: [],
            newsList: [],
        };

        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        this.fetch();
    }

    onDelete() {
        this.fetch();
    }

    fetch() {
        this.setState({
            isRequesting: true,
        });

        axios.get('/api/channels').then(response => {
            const channels = response.data;
            let newsList = [];

            channels.forEach(channel => {
                newsList = newsList.concat(channel.news_list);
            });

            this.setState({
                channels,
                newsList,
            })
        }).catch(reason => {
            toast.error(reason)
        }).finally(() =>  this.setState({ isRequesting: false }))
    }

    render(){
        const {isRequesting, channels, newsList} = this.state;

        if (isRequesting) return null;

        return (
           <Fragment>
               <h2>Channel</h2>
               <ChannelTable dataSource={channels} onDelete={this.onDelete}/>
               <hr/>
               <h2>News</h2>
               <NewsTable dataSource={newsList} onDelete={this.onDelete}/>
           </Fragment>
        )
    }
}
export default Dashboard;
