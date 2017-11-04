import React from 'react';
import PropTypes from 'prop-types';

const FavoriteTable = props => {
    return (<Table
                title={function (r) {
                    return (
                        <p>
                            <span>我的收藏</span>
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
        );
};

FavoriteTable.propTypes = {
    
};

export default FavoriteTable;