import React from 'react';
import { dataConnect } from 'relatejs';
import { bindActionCreators } from 'redux';
import { needLoadPage } from 'helpers/utils';
import * as clientActions from 'actions/clients';
import Notify from './components';

@dataConnect(
    (state) => ({ states: state.clients, pageSize: 3 }),
    (dispatch) => ({
        actions : bindActionCreators(clientActions, dispatch),
    }),
    (props) => ({
        manualLoad: true,
        fragments: Notify.fragments,
        variablesTypes: {
            notify: {
                pageNo: 'Int!',
                pageSize: 'Int!',
                type: 'Int!',
                keyword: 'String!',
            },
        },
        initialVariables: {
            notify: {
                pageNo: 0,
                pageSize: props.pageSize,
                type: -1,
                keyword: '',
            },
        },
    })
)
export default class NotifyContainer extends React.Component {
    getNotify (keyword = '') {
        const { relate, pageSize } = this.props;
        relate.refresh({
            variables: {
                notify: {
                    pageNo: 0,
                    pageSize,
                    type: -1,
                    keyword,
                },
            },
        });
    }
    loadListPage (keyword = '', type, pageNo) {
        const TYPES = ['news', 'publicity', 'policy', 'notice'];
        const { relate, pageSize, notify } = this.props;
        if (needLoadPage(notify[TYPES[type]], pageNo, pageSize)) {
            relate.loadPage({
                variables: {
                    notify: {
                        pageNo,
                        pageSize,
                        type,
                        keyword,
                    },
                },
                property:TYPES[type] + '.list',
            });
        }
    }
    render () {
        return (
            <Notify {...this.props}
                getNotify={::this.getNotify}
                loadListPage={::this.loadListPage} />
        );
    }
}
