
/*
 * Copyright (c) 2019. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

import ReactDOM from "react-dom";
import React, {Component} from 'react';

class Footer extends Component {
    render(){
        return (
            <footer className="footer-area footer--light bg-dark">
                <div className="mini-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="copyright-text">
                                    <p>© 2019 &nbsp;
                                        <a href="https://www.ezerway.com">www.ezerway.com</a>. All rights reserved. Created by
                                        &nbsp;
                                        <a href="https://www.ezerway.com">Bob</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;
