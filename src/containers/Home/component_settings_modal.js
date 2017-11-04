import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { message, Modal, Icon } from 'antd';
import { INDEX_FOCUSES_FETCH, INDEX_SETTINGS_MODAL_TOGGLE, INDEX_SETTINGS_MODAL_COMPONENT } from '../../constants';

import Focuses from './component_focus';
import Favorite from './component_favorite';

class SettingsModal extends Component {
    constructor(props, context) {
        super(props, context);
        [
            'toggle_modal_settings',

            'event_btn_click_component_change',

            'fetch_focuses',

        ].forEach(func => {
            this[func] = this[func].bind(this);
        });
    }

    componentDidMount() {

    }

    event_btn_click_component_change(component) {
        const { dispatch } = this.props;
        dispatch({ type: INDEX_SETTINGS_MODAL_COMPONENT, payload: { component: component } });
    }

    fetch_focuses() {
        const { dispatch } = this.props;
        dispatch({ type: INDEX_FOCUSES_FETCH });
    }

    toggle_modal_settings() {
        const { dispatch, settings_modal_visbale } = this.props;
        dispatch({ type: INDEX_SETTINGS_MODAL_TOGGLE, payload: { settings_modal_visbale: !settings_modal_visbale } });
    }

    render() {
        const { settings_modal_visbale, settings_modal_component, user } = this.props;
        console.log(settings_modal_component,'settings_modal_component')

        if (!user) return null;

        const toggle_modal_settings = this.toggle_modal_settings;
        const event_btn_click_component_change = this.event_btn_click_component_change;

        var content;

        switch (settings_modal_component) {
            case "focuses":
                content = <Focuses />;
                break;
            case "favorite":
                content = <Favorite />;
                break;
        }

        return (
            <Modal
                className="setting-modal"
                zIndex={1000}
                maskClosable={true}
                visible={settings_modal_visbale}
                width={720}
                footer={null}
                onCancel={toggle_modal_settings}
            >
                <div className="setting-modal-content">
                    <div className="slide-bar">
                        <div className="profile">
                            <img className="slide-profile-avatar" src={user.profile.avatar} />
                            <p className="slide-profile-nickname">{user.profile.nick_name}</p>
                        </div>
                        <div className="settings">
                            <ul>
                                <li><Icon type="inbox" /><a onClick={() => { event_btn_click_component_change("focuses") }}>任务清单</a></li>
                                <li><Icon type="heart-o" /><a onClick={() => { event_btn_click_component_change("favorite") }}>我的收藏</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="content">
                        {content}
                    </div>
                </div>
            </Modal>
        )
    }


}

export default connect((store) => {
    return {
        user: store["oidc"].user,

        settings_modal_visbale: store["sentence"].settings_modal_visbale,
        settings_modal_component: store["sentence"].settings_modal_component,
    }
})(SettingsModal);