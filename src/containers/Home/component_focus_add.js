import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, message, Modal, Icon, Card, Table, Popconfirm, Form, Input, Button } from 'antd';
import { push } from 'react-router-redux';
import { INDEX_FOCUS_ADD, INDEX_FOCUS_MODAL_TOGGLE } from '../../constants';

class FocusAddModal extends Component {
    constructor(props, context) {
        super(props, context);
        [
            'fetch_post_focus_add',

            'event_form_submit',

            'toggle_modal_add_focus'

        ].forEach(func => {
            this[func] = this[func].bind(this);
        });
    }
    componentDidMount() {

    }

    fetch_post_focus_add(focus) {
        const { dispatch } = this.props;
        dispatch({ type: INDEX_FOCUS_ADD, payload: { focus: focus } });
    }

    event_form_submit(e) {

        e.preventDefault();

        const { form } = this.props;

        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            this.fetch_post_focus_add(values.focus)
        });
    }

    toggle_modal_add_focus() {
        const { dispatch, focus_modal_visbale } = this.props;
        dispatch({ type: INDEX_FOCUS_MODAL_TOGGLE, payload: { focus_modal_visbale: !focus_modal_visbale } });
    }

    render() {
        const { focus_modal_visbale, user, form } = this.props;
        const { getFieldDecorator } = form;

        const event_form_submit = this.event_form_submit;
        const toggle_modal_add_focus = this.toggle_modal_add_focus;

        return (
            <Modal
                style={{ top: 20 }}
                className="focus-add-modal"
                maskClosable={true}
                zIndex={1200}
                visible={focus_modal_visbale && user}
                width={720}
                closable={false}
                footer={null}
                onCancel={toggle_modal_add_focus}
            >
                <Form onSubmit={event_form_submit}>
                    <Form.Item className="form-item-focus-text">
                        {getFieldDecorator('focus', {
                            rules: [{ required: true, message: '　' }],
                        })(<Input className="form-item-focus-input" autoComplete="off" autoFocus={true} placeholder="今天要做些什么？按Enter键完成添加" />)
                        }
                    </Form.Item>
                </Form>
            </Modal>

        )
    }
}


export default connect((store) => {
    return {
        user: store["oidc"].user,
        user: store["focus"].focus_modal_visbale,
    }
})(Form.create()(FocusAddModal));