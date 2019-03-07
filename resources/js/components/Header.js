
import ReactDOM from "react-dom";
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

const menu = {
    '/' : 'GUI',
    'management' : 'Management',
    'fetch-channel' : 'Fetch Channel',
};

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '/'
        }
    }

    clickItem(selected) {
        this.setState({
            selected
        }, () => {
            this.props.history.push(selected)
        })
    }

    render(){

        const {selected} = this.state;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Feeds Reader</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        {
                            Object.values(menu).map((item, index) => {
                                let href = Object.keys(menu)[index];
                                let className = `nav-item ${ selected === href ? 'active' : ''}`;
                                return (
                                    <li className={className} key={index}>
                                        <a className="nav-link" href="javascript:void(0)"
                                        onClick={() => this.clickItem(href)}
                                        >{item}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}
export default withRouter(Header);
