import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, message, Modal, Icon, Card, Table, Popconfirm, Form, Input, Button } from 'antd';
import { push } from 'react-router-redux';

import FocusEmpty from './component_focus_empty';

class FocusTable extends Component {

    constructor(props, context) {
        super(props, context);
        [
            'fetch_focuses',
            'fetch_put_focus_pin',
            'fetch_delete_focus_remove',

            'event_btn_click_add_focus',
            'event_btn_click_complete_focus',
            'event_btn_click_pin_focus',
            'event_btn_click_remove_focus_comfirm',

        ].forEach(func => {
            this[func] = this[func].bind(this);
        });
    }

    componentDidMount() {
        this.fetch_focuses();
    }

    fetch_focuses() {
        const { dispatch } = this.props;
        dispatch({ type: "INDEX_FOCUSES_FETCH" });
    }

    fetch_put_focus_pin(key) {
        const { dispatch } = this.props;
        dispatch({ type: "INDEX_FOCUS_PIN", payload: { key: key } });
    }

    fetch_delete_focus_remove(key) {
        const { dispatch } = this.props;
        dispatch({ type: "INDEX_FOCUS_REMOVE", payload: { key: key } });
    }

    fetch_put_focus_complete(key, selected) {
        const { dispatch } = this.props;
        dispatch({ type: "INDEX_FOCUS_COMPLETE", payload: { key: key, selected: selected } });
    }

    event_btn_click_add_focus() {
        const { dispatch, focus_modal_visbale } = this.props;
        dispatch({ type: "INDEX_FOCUS_MODAL_TOGGLE", payload: { focus_modal_visbale: !focus_modal_visbale } });
    }

    event_btn_click_complete_focus(key, selected) {
        this.fetch_put_focus_complete(key, selected);
    }

    event_btn_click_remove_focus_comfirm(key) {
        this.fetch_delete_focus_remove(key);
    }

    event_btn_click_pin_focus(key) {
        this.fetch_put_focus_pin(key);
    }

    _record_completed_class(record, target_class, default_class) {

        return record.status == 'Completed'
            ? target_class || 'focus-completed'
            : default_class || '';
    }

    _record_pin_class(record, target_class, default_class) {

        return record.status == 'Focus'
            ? target_class || 'focus-action-icon-pushpin focus-pin'
            : default_class || 'focus-action-icon-pushpin';
    }

    _record_completed(record) {
        return record.status == 'Completed';
    }

    render() {

        const { focus_table_loading, focus_today } = this.props;

        const event_btn_click_add_focus = this.event_btn_click_add_focus;
        const event_btn_click_remove_focus_comfirm = this.event_btn_click_remove_focus_comfirm;
        const event_btn_click_complete_focus = this.event_btn_click_complete_focus;
        const event_btn_click_pin_focus = this.event_btn_click_pin_focus;

        const record_completed_class = this._record_completed_class;
        const record_pin_class = this._record_pin_class;
        const record_completed = this._record_completed;

        if (focus_today.length == 0) {
            return <FocusEmpty />;
        }

        return (
            <Table
                title={function (r) {
                    return (
                        <p>
                            <span>任务清单</span>
                            <span className="focus-add-icon">
                                <Tooltip title={"新建任务"}>
                                    <a onClick={event_btn_click_add_focus}><Icon type="plus" /></a>
                                </Tooltip>
                            </span>
                        </p>
                    );
                }}
                showHeader={false}
                loading={focus_table_loading}
                pagination={false}
                scroll={{ x: false, y: 370 }}
                rowSelection={{
                    selectedRowKeys: Array.from(focus_today.filter(x => { return x.status == "Completed" })).map(x => x.key),
                    onSelect: (record, selected, selectedRows) => {
                        record && event_btn_click_complete_focus(record.key, selected);
                    }
                }} columns={[{
                    key: '-1',
                    dataIndex: 'content',
                    width: 295,
                    render: (text, record) => <a className={record_completed_class(record)} href="#">{text}</a>,
                }, {
                    key: '-2',
                    render: (text, record) => (
                        <span>
                            <Popconfirm title="确定要删除这个任务么？" onConfirm={() => { event_btn_click_remove_focus_comfirm(record.key) }} okText="确定" cancelText="取消">
                                <a className={record_completed_class(record)} disabled={record_completed(record)} href="#">
                                    <Icon type="delete" />
                                </a>
                            </Popconfirm>
                            <span className="ant-divider" />
                            <Tooltip title={"固定到首页"} >
                                <a className={record_completed_class(record)} disabled={record_completed(record)} onClick={() => event_btn_click_pin_focus(record.key)} href="#">
                                    <Icon className={record_pin_class(record)} type="pushpin-o" />
                                </a>
                            </Tooltip>
                        </span>
                    ),
                }, {
                    key: '-3',
                    width: 0,
                    render: (text, record) => (
                        <div className={record_completed_class(record, 'focus-row-underline')}></div>
                    ),
                }
                ]} dataSource={focus_today} />
        )
    }
}

export default connect((store) => {
    return {
        user: store["oidc"].user,

        focus_today: store["focus"].focus_today,
        focus_table_loading: store["focus"].focus_table_loading,
        focus_modal_visbale: store["focus"].focus_modal_visbale,
    }
})(FocusTable);