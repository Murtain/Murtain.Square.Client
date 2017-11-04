import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { INDEX_FOCUS_MODAL_TOGGLE} from '../../constants';

class FocusEmpty extends Component {
    constructor(props, context) {
        super(props, context);
        [
            'event_btn_click_add_focus',

        ].forEach(func => {
            this[func] = this[func].bind(this);
        });
    }

    event_btn_click_add_focus() {
        const { dispatch, focus_modal_visbale } = this.props;
        dispatch({ type: INDEX_FOCUS_MODAL_TOGGLE, payload: { focus_modal_visbale: !focus_modal_visbale } });
    }

    render() {
        const event_btn_click_add_focus = this.event_btn_click_add_focus;
        return (
            <div className="focus-empty">
                <Icon type="edit" />
                <p><span>今天还没有任务，点击</span><a onClick={event_btn_click_add_focus}>新建任务</a></p>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        user: store["oidc"].user,
    }
})(FocusEmpty);