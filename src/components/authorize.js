import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover } from 'antd';
import { push } from 'react-router-redux';

import { OIDC_LOAD_USER } from '../constants'
import userManager from '../services/userManager';

import styles from './authorize.css'


class Authorize extends Component {

    constructor(props, context) {
        super(props, context)

        this.signin = this.signin.bind(this);
        this.signout = this.signout.bind(this);
        
    }

    componentDidMount() {
    }

    signin() {
        event.preventDefault();
        const { dispatch } = this.props;
        userManager.signinPopup().then(function (user) {
            dispatch({ type: OIDC_LOAD_USER });
        });
    }

    signout() {
        userManager.signoutRedirect();
    }

    render() {
        const { user } = this.props;
        if (user == null) {
            return (
                <div className="btn_container">
                    <a className="btn_authorize" onClick={this.signin} >登录</a>
                </div>
            );
        }

        return (
            <Popover
                placement="bottom"
                trigger="click"
                content={<a onClick={this.signout}>注销</a>}>
                <div className="profile">
                    <img className="profile-avatar" src={user.profile.avatar} />
                    <span className="profile-nick">{user.profile.nick_name}</span>
                </div>
            </Popover>
        )

    }
}

export default connect((store) => {
    console.log("component_authorize", store)
    return {
        user: store["oidc"].user,
    }
})(Authorize);