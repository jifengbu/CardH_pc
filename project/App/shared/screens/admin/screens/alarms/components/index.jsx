import React from 'react';
import { findDOMNode } from 'react-dom';
import { Table, Input, Button, Spin, Modal, InputNumber, notification } from 'ant-design';
import styles from './index.less';
import verification from 'helpers/verification';
import _ from 'lodash';
const Search = Input.Search;

const columns = [{
    title: '电话号码',
    dataIndex: 'phone',
}, {
    title: '姓名',
    dataIndex: 'name',
}, {
    title: '卡号',
    dataIndex: 'card',
}, {
    title: '余额',
    dataIndex: 'leftMoney',
}, {
    title: '办卡时间',
    dataIndex: 'date',
}, {
    title: '备注',
    dataIndex: 'remark',
}];

export default class Clients extends React.Component {
    static fragments = {
        clients: {
            count: 1,
            list: {
                phone: 1,
                name: 1,
                card: 1,
                date: 1,
                leftMoney: 1,
                remark: 1,
            },
        },
    };
    state = { current: this.props.lastCurrent || 1, keyword: '' }
    onRowClick (record, index) {
        const { relate, history, clients } = this.props;
        const { current } = this.state;
        relate.setKeepData({ lastSelectIndex: index, lastCurrent: current });
        history.push({ pathname: '/admin/clients/detail', state: { phone: record.phone } });
    }
    rowClassName (record, index) {
        const { lastCurrent, lastSelectIndex } = this.props;
        const { current } = this.state;
        return current === lastCurrent && lastSelectIndex === index ? styles.selected : '';
    }
    onSearch (keyword) {
        const { getClients } = this.props;
        if (!verification.checkPhone(keyword)) {
            notification.error({ description: '请输入有效的电话号码' });
            return;
        }
        this.setState({ current: 1, keyword: keyword });
        getClients(keyword);
    }
    render () {
        const self = this;
        const { current, keyword } = this.state;
        const { states, clients = {}, loadListPage, loading, loadingPage } = this.props;
        const pagination = {
            total: clients.count,
            showSizeChanger: false,
            current,
            pageSize: 3,
            onChange (current) {
                self.setState({ current });
                loadListPage(keyword, current - 1);
            },
        };
        return (
            <div className={styles.container}>
                <div className={styles.searchContainer}>
                    {
                        loading ?
                            <div style={{ textAlign:'center' }}>
                                <Spin />
                                <div>正在查找...</div>
                            </div>
                        :
                            <Search className={styles.search} placeholder='输入电话号码查找' onSearch={::this.onSearch} />
                    }
                </div>
                <div className={styles.tableContainer} ref='tableContainer'>
                    <Table
                        loading={loadingPage}
                        columns={columns}
                        dataSource={clients.list}
                        pagination={pagination}
                        rowClassName={::this.rowClassName}
                        onRowClick={::this.onRowClick} />
                </div>
            </div>
        );
    }
}
