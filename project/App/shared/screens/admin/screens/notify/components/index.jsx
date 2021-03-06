import React from 'react';
import { Table, Input, Button, Spin, Modal, Tabs, notification } from 'ant-design';
import styles from './index.less';
import verification from 'helpers/verification';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
const Search = Input.Search;
const TabPane = Tabs.TabPane;

const columns = [{
    title: '标题',
    dataIndex: 'title',
}, {
    title: '时间',
    dataIndex: 'time',
}, {
    title: '来源',
    dataIndex: 'source',
}];

export default class Notify extends React.Component {
    static fragments = {
        notify: {
            news: {
                count: 1,
                list:{
                    title: 1,
                    time: 1,
                    source: 1,
                },
            },
            publicity: {
                count: 1,
                list:{
                    title: 1,
                    time: 1,
                    source: 1,
                },
            },
            policy: {
                count: 1,
                list:{
                    title: 1,
                    time: 1,
                    source: 1,
                },
            },
            notice: {
                count: 1,
                list:{
                    title: 1,
                    time: 1,
                    source: 1,
                },
            },
        },
    };
    state = { currents: {} }
    onSearch (keyword) {
        const { actions, getNotify } = this.props;
        this.setState({ currents: {} });
        this.keyword = keyword;
        getNotify(keyword);
    }
    render () {
        const self = this;
        const { currents } = this.state;
        const { notify = {}, loadListPage, loading, loadingPage } = this.props;
        const { news = {}, publicity = {}, policy = {}, notice = {} } = _.omitBy(notify, _.isNil);
        const pagination = (item, type) => ({
            total: item.count,
            showSizeChanger: false,
            pageSize: 3,
            current: currents[type],
            onChange (current) {
                currents[type] = current;
                self.setState({ currents });
                loadListPage(this.keyword, type, current - 1);
            },
        });
        return (
            <div className={styles.container}>
                <div className={styles.searchContainer}>
                    {
                        <Search className={styles.search} placeholder='输入电话号码查找' onSearch={::this.onSearch} />
                    }
                </div>
                <div className='cardContainer'>
                    <Tabs type='card'>
                        <TabPane tab='行业新闻' key='1'>
                            <Table
                                loading={loadingPage}
                                columns={columns}
                                dataSource={news.list}
                                pagination={pagination(news, 0)} />
                        </TabPane>
                        <TabPane tab='违规公示' key='2'>
                            <Table
                                loading={loadingPage}
                                columns={columns}
                                dataSource={publicity.list}
                                pagination={pagination(publicity, 1)} />
                        </TabPane>
                        <TabPane tab='行业政策' key='3'>
                            <Table
                                loading={loadingPage}
                                columns={columns}
                                dataSource={policy.list}
                                pagination={pagination(policy, 2)} />
                        </TabPane>
                        <TabPane tab='通知' key='4'>
                            <Table
                                loading={loadingPage}
                                columns={columns}
                                dataSource={notice.list}
                                pagination={pagination(notice, 3)} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
