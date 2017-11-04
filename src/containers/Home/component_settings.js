import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { INDEX_SETTINGS_MODAL_TOGGLE } from '../../constants';

class Settings extends Component {
    constructor(props, context) {
        super(props, context);
        [
            'toggle_modal_settings',
            'event_btn_click_settings',

        ].forEach(func => {
            this[func] = this[func].bind(this);
        });
    }
    componentDidMount() {
    }

    toggle_modal_settings() {
        const { dispatch, settings_modal_visbale } = this.props;
        dispatch({ type: INDEX_SETTINGS_MODAL_TOGGLE, payload: { settings_modal_visbale: !settings_modal_visbale } });
    }

    event_btn_click_settings() {

        const { dispatch, user } = this.props;

        if (!user) {
            message.warning("请登录后查看任务清单");
            return;
        }

        this.toggle_modal_settings();
    }

    render() {
        const event_btn_click_settings = this.event_btn_click_settings;
        return (
            <div className="setting" onClick={event_btn_click_settings}>
                <span className="setting-icon">
                    <svg className="setting-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340.274 340.274">
                        <path d="M293.629 127.806l-5.795-13.739c19.846-44.856 18.53-46.189 14.676-50.08l-25.353-24.77-2.516-2.12h-2.937c-1.549 0-6.173 0-44.712 17.48l-14.184-5.719c-18.332-45.444-20.212-45.444-25.58-45.444h-35.765c-5.362 0-7.446-.006-24.448 45.606l-14.123 5.734C86.848 43.757 71.574 38.19 67.452 38.19l-3.381.105-27.27 26.737c-4.138 3.891-5.582 5.263 15.402 49.425l-5.774 13.691C0 146.097 0 147.838 0 153.33v35.068c0 5.501 0 7.44 46.585 24.127l5.773 13.667c-19.843 44.832-18.51 46.178-14.655 50.032l25.353 24.8 2.522 2.168h2.951c1.525 0 6.092 0 44.685-17.516l14.159 5.758c18.335 45.438 20.218 45.427 25.598 45.427h35.771c5.47 0 7.41 0 24.463-45.589l14.195-5.74c26.014 11 41.253 16.585 45.349 16.585l3.404-.096 27.479-26.901c3.909-3.945 5.278-5.309-15.589-49.288l5.734-13.702c46.496-17.967 46.496-19.853 46.496-25.221V151.88c-.005-5.519-.005-7.446-46.644-24.074zM170.128 228.474c-32.798 0-59.504-26.187-59.504-58.364 0-32.153 26.707-58.315 59.504-58.315 32.78 0 59.43 26.168 59.43 58.315-.006 32.177-26.656 58.364-59.43 58.364z" fill="#FFF">
                        </path>
                    </svg>
                </span>
                <span className="setting-text">设置</span>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        user: store["oidc"].user,
        user: store["settings"].settings_modal_visbale,
    }
})(Settings);