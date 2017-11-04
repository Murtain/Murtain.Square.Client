import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, message, Modal, Icon, Card, Table, Popconfirm, Form, Input, Button } from 'antd';
import { Link, Route, Switch } from 'react-router-dom'
import { push } from 'react-router-redux';

import * as ACTION_TYPE from '../../constants'


import Authorize from '../../components/authorize'

import FocusEmpty from './component_focus_empty'
import FocusNow from './component_focus_now'
import FocusAddModal from './component_focus_add'

import Focuses from './component_focus'
import Settings from './component_settings'
import Weather from './component_weather'
import Sentence from './component_sentence'
import Welcome from './component_welcome'
import SettingsModal from './component_settings_modal'


import 'nprogress/nprogress.css'
import './index.css'


class HomePage extends Component {

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps) {
        return false;
    }

    render() {

        return (
            <div className="container">
                <div className="overlay overlay-loading"></div>
                <div className="overlay overlay-drop"></div>
                <div className="overlay overlay-background" style={{ backgroundImage: 'url("http://static.x-dva.com/resources/images/overlay-vignette.png")' }}></div>
                <div className="background">
                    <ul>
                        <li className="fadein" style={{ backgroundImage: 'url("https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-60425.jpg")' }}></li>
                        <li className="fadein" style={{ backgroundImage: 'url("https://d3cbihxaqsuq0s.cloudfront.net/images/41176656_xl.jpg")' }}></li>
                        <li className="fadein" style={{ backgroundImage: 'url("https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-546654.jpg")' }}></li>
                    </ul>
                </div>
                <div className="widgets">
                    <div className="top-left">
                        <Authorize />
                    </div>
                    <div className="top-right">
                        <Weather />
                    </div>
                    <div className="center center-welcome">
                        <Welcome />
                    </div>
                    <div className="center center-focus">
                        <FocusNow />
                    </div>
                    <div className="bottom-left">
                        <Settings />
                    </div>
                    <div className="bottom-center">
                        <Sentence />
                    </div>
                </div>
                <div className="modal_settings">
                    <SettingsModal />
                </div>
                <div className="moadl-focus-add">
                    <FocusAddModal />
                </div>
            </div>
        )
    }

}

export default connect((store) => {
    console.log("store", store)
    return {
        user: store["oidc"].user,
    }
})(HomePage);






