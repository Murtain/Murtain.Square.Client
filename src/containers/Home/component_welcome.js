import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { INDEX_TIME_FETCH } from '../../constants';

class Welcome extends Component {
    constructor(props, context) {
        super(props, context);
        [

            'fetch_welcome_time',

        ].forEach(func => {
            this[func] = this[func].bind(this);
        });
    }

    componentDidMount() {
        this.fetch_welcome_time();
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    fetch_welcome_time() {
        const { dispatch } = this.props;
        dispatch({ type: INDEX_TIME_FETCH });
        this.timer = setInterval(function () {
            dispatch({ type: INDEX_TIME_FETCH });
        }, 5000);
    }

    render() {
        console.error("component_welcome render...", )

        const { user, welcome_time, welcome_text, welcome_date } = this.props;

        if (!user || !welcome_text) {
            return (
                <div>
                    <div className="clock">
                        <h1>{welcome_time}</h1>
                    </div>
                    <div className="welcome">
                        <h2>{welcome_date}</h2>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="clock">
                    <h1>{welcome_time}</h1>
                </div>
                <div className="welcome">
                    <h2>{welcome_text + '，' + user.profile.nick_name}</h2>
                </div>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        data: {
            user: store["oidc"].user,
            welcome_time: store["clock"].welcome_time,
            welcome_text: store["clock"].welcome_text,
            welcome_date: store["clock"].welcome_date
        }
    }
})(Welcome);