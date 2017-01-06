import React from 'react';
import { Table, Input, Form, Button, Spin, Modal, InputNumber, notification } from 'ant-design';
import styles from './index.less';
import verification from 'helpers/verification';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import moment from 'moment';
const Search = Input.Search;

const columns = [{
    title: '消费金额',
    dataIndex: 'fee',
}, {
    title: '余额',
    dataIndex: 'leftMoney',
}, {
    title: '消费日期',
    dataIndex: 'date',
}, {
    title: '备注',
    dataIndex: 'remark',
}];

export default class Recharge extends React.Component {
    static fragments = {
        client: {
            name: 1,
            sex: 1,
            age: 1,
            phone: 1,
            email: 1,
            card: 1,
            date: 1,
            leftMoney: 1,
            discount: 1,
            unit: 1,
            period: 1,
        },
        consumeRecords: {
            count: 1,
            list:{
                fee: 1,
                leftMoney: 1,
                date: 1,
                remark: 1,
            },
        },
    };
    state = { current: 1 }
    onSearch (phone) {
        const { actions, getClientInfo } = this.props;
        if (!verification.checkPhone(phone)) {
            notification.error({ description: '请输入有效的电话号码' });
            return;
        }
        this.setState({ current: 1 });
        getClientInfo(phone);
    }
    render () {
        const self = this;
        const { current } = this.state;
        const { client, consumeRecords = {}, loadListPage, loading, loadingPage } = this.props;
        const { name, sex, age, phone, email, card, date, leftMoney, discount, unit, period } = client || {};
        const discountText = discount === 1 ? '无折扣' : (1 - discount) * 10 + '折';
        const discountUnit = unit * discount;
        const expiryDate = moment(date).add(period, 'years').format('YYYY-MM-DD');
        const pagination = {
            total: consumeRecords.count,
            showSizeChanger: false,
            pageSize: 3,
            current,
            onChange (current) {
                self.setState({ current });
                loadListPage(phone, current - 1);
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
                {
                    !!client &&
                    <div className={styles.contentContainer}>
                        <div className={styles.title}>
                            持卡人信息
                        </div>
                        <div className={styles.info}>
                            <span className={styles.cell}>{name}</span>
                            <span className={styles.cell}>{sex ? '男' : '女'}</span>
                            <span className={styles.cell}>{age}岁</span>
                            <span className={styles.cell}>电话：{phone}</span>
                            <span className={styles.cell}> 邮箱：{email}</span>
                        </div>
                        <div className={styles.title}>
                            卡片信息
                        </div>
                        <div className={styles.cardInfo}>
                            <span className={styles.cell}>卡号：{card}</span>
                            <span className={styles.cell}>发卡时间：{date}</span>
                            <span className={styles.cell}>卡内余额：{leftMoney}</span>
                        </div>
                        <div className={styles.cardInfo}>
                            <span className={styles.cell}>打折信息：{discountText}</span>
                            <span className={styles.cell}>产品单价：{unit}元 折后：{discountUnit}元</span>
                            <span className={styles.cell}>卡片有效期：{period}年 截止日期：{expiryDate}</span>
                        </div>
                        <div className={styles.title}>
                            消费记录
                        </div>
                        <div className={styles.tableContainer}>
                            <Table
                                loading={loadingPage}
                                columns={columns}
                                dataSource={consumeRecords.list}
                                pagination={pagination} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}
