import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, message, Modal, Icon, Card, Table, Popconfirm, Form, Input, Button } from 'antd';
import { Link, Route, Switch } from 'react-router-dom'
import { push } from 'react-router-redux';

import * as ACTION_TYPE from '../../constants';
import Authorize from '../../components/authorize'

import 'nprogress/nprogress.css';
import './index.css';


class HomePage extends Component {

    constructor(props, context) {
        super(props, context);

        [
            'render_component_welcome',
            'render_component_focus',
            'render_component_sentence',
            'render_component_weather',
            'render_component_settings',

            'render_component_settings_modal',
            'render_component_add_focus_modal',

            'fetch_focuses',
            'fetch_post_focus_add',
            'fetch_delete_focus_remove',
            'fetch_welcome_time',
            'fetch_sentence_random',
            'fetch_weather',
            'fetch_post_sentence_heart',

            'toggle_modal_settings',
            'toggle_modal_add_focus',

            'event_btn_click_heart',
            'event_btn_click_refresh',
            'event_btn_click_settings',
            'event_btn_click_add_focus',
            'event_btn_click_complete_focus',
            'event_btn_click_pin_focus',
            'event_btn_click_remove_focus_comfirm',

        ].forEach(func => {
            this[func] = this[func].bind(this);
        });

    }

    componentDidMount() {

        this.fetch_welcome_time();
        this.fetch_sentence_random();
        this.fetch_weather();

    }
    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    fetch_sentence_random() {
        const { dispatch } = this.props;
        dispatch({ type: ACTION_TYPE.INDEX_SENTENCE_FETCH });
    }

    fetch_welcome_time() {
        const { dispatch } = this.props;
        dispatch({ type: ACTION_TYPE.INDEX_TIME_FETCH });

        this.timer = setInterval(function () {
            dispatch({ type: ACTION_TYPE.INDEX_TIME_FETCH });
        }, 5000);
    }

    fetch_weather() {
        const { dispatch } = this.props;
        dispatch({ type: ACTION_TYPE.INDEX_WEATHER_FETCH });
    }

    fetch_focuses() {
        const { dispatch } = this.props;
        dispatch({ type: ACTION_TYPE.INDEX_FOCUSES_FETCH });
    }

    fetch_post_sentence_heart() {
        const { dispatch, sentence_heart_icon } = this.props;
        dispatch({
            type: ACTION_TYPE.INDEX_SENTENCE_HEART_FETCH, payload: {
                sentence_heart_icon: sentence_heart_icon
            }
        });
    }

    fetch_post_focus_add(focus) {
        const { dispatch } = this.props;
        dispatch({ type: ACTION_TYPE.INDEX_FOCUS_ADD, payload: { focus: focus } });
    }

    fetch_delete_focus_remove(key) {
        const { dispatch } = this.props;
        dispatch({ type: ACTION_TYPE.INDEX_FOCUS_REMOVE, payload: { key: key } });
    }

    fetch_delete_focus_remove(key) {
        const { dispatch } = this.props;
        dispatch({ type: ACTION_TYPE.INDEX_FOCUS_REMOVE, payload: { key: key } });
    }

    fetch_put_focus_complete(key) {
        const { dispatch } = this.props;
        dispatch({ type: ACTION_TYPE.INDEX_FOCUS_COMPLETE, payload: { key: key } });
    }

    fetch_put_focus_pin(key) {
        const { dispatch } = this.props;
        dispatch({ type: ACTION_TYPE.INDEX_FOCUS_PIN, payload: { key: key } });
    }

    toggle_modal_settings() {
        const { dispatch, settings_modal_visbale } = this.props;
        dispatch({ type: ACTION_TYPE.INDEX_SETTINGS_MODAL_TOGGLE, payload: { settings_modal_visbale: !settings_modal_visbale } });
    }

    toggle_modal_add_focus() {
        const { dispatch, focus_modal_visbale } = this.props;
        dispatch({ type: ACTION_TYPE.INDEX_FOCUS_MODAL_TOGGLE, payload: { focus_modal_visbale: !focus_modal_visbale } });
    }


    event_btn_click_heart() {
        this.fetch_post_sentence_heart();
    }

    event_btn_click_refresh() {
        message.warning('quote refresh icon click.');
    }

    event_btn_click_settings() {

        const { dispatch, settings_modal_visbale } = this.props;
        if (!settings_modal_visbale) {
            this.fetch_focuses();
        }
        this.toggle_modal_settings();
    }

    event_btn_click_add_focus() {

        this.toggle_modal_add_focus();

    }

    event_btn_click_remove_focus_comfirm(key) {
        this.fetch_delete_focus_remove(key);
    }

    event_btn_click_complete_focus(key) {
        this.fetch_put_focus_complete(key);
    }

    event_btn_click_pin_focus(key) {
        this.fetch_put_focus_pin(key);
    }

    render_component_authorize() {
        return (<Authorize />);
    }

    render_component_focus() {
        const { user } = this.props;
        if (user == null) {
            /*return (
                <div className="focuses">
                    <div className="prompt">
                        <h3>今天要做些什么？</h3>
                        <input type="text" />
                    </div>
                </div>
            )*/

            return null;
        }

        return (
            <div className="focuses">
                <ul>
                    <li className="focus">
                        <h3>TODAY</h3>
                        <span className="focus-group">
                            {/*<input className="focus-check" type="checkbox" />*/}
                            <span className="focus-text">
                                com.x-dva.square
                                    </span>
                        </span>
                    </li>
                </ul>
            </div>
        )
    }

    render_component_welcome() {

        const { user } = this.props;
        const { welcome_time, welcome_text, welcome_date } = this.props;

        if (user == null || welcome_text == null) {
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

    render_component_sentence() {

        const { sentence, sentence_heart_icon } = this.props;

        if (sentence == null || sentence_heart_icon == undefined) {
            return null;
        }
        return (
            <div className="quote">
                <p className="quote-body">
                    <span className="quote-text">“{sentence.famous_saying}”</span>
                    <span className="quote-source">
                        <span className="quote-source-text">{sentence.famous_name}</span>
                    </span>
                    <img src={sentence_heart_icon} className="icon icon-heart quote-heart" onClick={this.heart} />
                </p>
            </div>
        );
    }

    render_component_weather() {

        const { weather } = this.props;

        if (weather == null || weather == undefined) {
            return null;
        }

        return (
            <div className="weather">
                <span className="weather-location">{weather.realtime.city_name}</span>
                <span className="weather-icon">{weather.realtime.weather.info}</span>
                <span className="weather-metric">{weather.realtime.weather.temperature + '°'}</span>
            </div>
        )
    }

    render_component_settings() {
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

    render_component_settings_modal() {

        const { settings_modal_visbale, user, focus_table_loading, focus_today } = this.props;

        const event_btn_click_add_focus = this.event_btn_click_add_focus;
        const event_btn_click_remove_focus_comfirm = this.event_btn_click_remove_focus_comfirm;
        const event_btn_click_complete_focus = this.event_btn_click_complete_focus;
        const event_btn_click_pin_focus = this.event_btn_click_pin_focus;

        if (settings_modal_visbale != true || user == null) {
            return null;
        }

        function record_completed_class(record, target_class, default_class) {

            return record.status == 'Completed' ? target_class || 'focus-completed' : default_class || '';
        }

        function record_pin_class(record, target_class, default_class) {

            return record.status == 'Focus' ? target_class || 'focus-action-icon-pushpin focus-pin' : default_class || 'focus-action-icon-pushpin';
        }

        function record_completed(record) {
            return record.status == 'Completed';
        }
        const focus_table = (
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
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    },
                }} columns={[{
                    key: '-1',
                    dataIndex: 'content',
                    width: 250,
                    render: (text, record) => <a className={record_completed_class(record)} href="#">{text}</a>,
                }, {
                    key: '-2',
                    render: (text, record) => (
                        <span>
                            <Popconfirm title="确定要删除这个任务么？" onConfirm={() => { event_btn_click_remove_focus_comfirm(record.key) }} okText="确定" cancelText="取消">
                                <a className={record_completed_class(record)} href="#">
                                    <Icon type="delete" />
                                </a>
                            </Popconfirm>
                            <span className="ant-divider" />
                            <Tooltip title={"固定到首页"} >
                                <a className={record_completed_class(record)} disabled={record_completed(record)} onClick={() => event_btn_click_pin_focus(record.key)} href="#">
                                    <Icon className={record_pin_class(record)} type="pushpin-o" />
                                </a>
                            </Tooltip>
                            <span className="ant-divider" />
                            <Tooltip title={"任务完成"}>
                                <a className={record_completed_class(record)} disabled={record_completed(record)} onClick={() => event_btn_click_complete_focus(record.key)} href="#">
                                    <Icon type="check" />
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
        );

        const focus_empty = (
            <div className="focus-empty">
                <Icon type="edit" />
                <p><span>今天还没有任务，点击</span><a href="">新建任务</a></p>
            </div>
        );

        return (
            <Modal
                className="setting-modal"
                zIndex={1000}
                maskClosable={true}
                visible={settings_modal_visbale}
                width={720}
                footer={null}
                onCancel={this.toggle_modal_settings}
            >
                <div className="setting-modal-content">
                    <div className="slide-bar">
                        <div className="profile">
                            <img className="slide-profile-avatar" src={user.profile.avatar} />
                            <p className="slide-profile-nickname">{user.profile.nick_name}</p>
                        </div>
                        <div className="settings">
                            <ul>
                                <li><Icon type="inbox" /><a href="">任务清单</a></li>
                                <li><Icon type="heart-o" /><a href="">我的收藏</a></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <div className="content">
                        {focus_table}
                    </div>
                </div>
            </Modal>
        )
    }

    render_component_add_focus_modal() {

        const form_focus = ({ form }) => {

            const { getFieldDecorator, onSubmit } = form;

            const form_submit = (e) => {
                e.preventDefault();
                form.validateFields((err, values) => {
                    if (!err) {
                        this.fetch_post_focus_add(values.focus)
                    }
                });
            }
            return (
                <Form onSubmit={form_submit}>
                    <Form.Item className="form-item-focus-text">
                        {getFieldDecorator('focus', {
                            rules: [{ required: true, message: '　' }],
                        })(<Input className="form-item-focus-input" autoComplete="off" autoFocus placeholder="按Enter键完成添加" />)
                        }
                    </Form.Item>
                </Form>
            );
        };

        const { focus_modal_visbale } = this.props;

        const FormFocus = Form.create()(form_focus);

        return (
            <Modal
                style={{ top: 20 }}
                className="focus-add-modal"
                maskClosable={true}
                zIndex={1200}
                visible={focus_modal_visbale}
                width={720}
                closable={false}
                footer={null}
                onCancel={this.toggle_modal_add_focus}
            >
                <FormFocus />
            </Modal>
        )
    }

    render() {

        const component_authorize = this.render_component_authorize();
        const component_welcome = this.render_component_welcome();
        const component_focus = this.render_component_focus();
        const component_sentence = this.render_component_sentence();
        const component_weather = this.render_component_weather();
        const component_settings = this.render_component_settings();
        const component_settings_modal = this.render_component_settings_modal();
        const component_add_focus_modal = this.render_component_add_focus_modal();

        return (
            <div className="container">
                <div className="overlay overlay-loading"></div>
                <div className="overlay overlay-drop"></div>
                <div className="overlay overlay-background" style={{ backgroundImage: 'url("http://static.x-dva.com/resources/images/overlay-vignette.png")' }}></div>
                <div className="background">
                    <ul>
                        <li className="fadein" style={{ backgroundImage: 'url("https://d3cbihxaqsuq0s.cloudfront.net/images/41176656_xl.jpg")' }}></li>
                    </ul>
                </div>
                <div className="widgets">
                    <div className="top-left">
                        {component_authorize}
                    </div>
                    <div className="top-right">
                        {component_weather}
                    </div>
                    <div className="center center-welcome">
                        {component_welcome}
                    </div>
                    <div className="center center-focus">
                        {component_focus}
                    </div>
                    <div className="bottom-left">
                        {component_settings}
                    </div>
                    <div className="bottom-center">
                        {component_sentence}
                    </div>
                </div>
                <div className="modal_settings">
                    {component_settings_modal}
                </div>
                <div className="moadl-focus-add">
                    {component_add_focus_modal}
                </div>
            </div>
        )
    }

};

function map_state_to_props(state) {

    const { user } = state.oidc;

    const {
        welcome_date,
        welcome_time,
        welcome_text,
        sentence,
        sentence_heart_icon,
        settings_modal_visbale,
        focus,
        focus_today,
        focus_table_loading,
        focus_modal_visbale,
        weather
    } = state.index;

    const new_state = {
        user: user,

        welcome_text: welcome_text,
        welcome_time: welcome_time,
        welcome_date: welcome_date,

        focus: focus,
        focus_today: focus_today,
        focus_table_loading: focus_table_loading,
        focus_modal_visbale: focus_modal_visbale,

        sentence: sentence,
        sentence_heart_icon: sentence_heart_icon,

        settings_modal_visbale: settings_modal_visbale,

        weather: weather,

    };
    return new_state;
}

function map_dispatch_to_props(dispatch) {
    return {
        dispatch: dispatch
    }

}

export default connect(map_state_to_props, map_dispatch_to_props)(HomePage);






