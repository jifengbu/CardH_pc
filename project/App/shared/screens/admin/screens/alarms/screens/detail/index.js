import React from 'react';
import { dataConnect } from 'relatejs';
import { bindActionCreators } from 'redux';
import * as clientActions from 'actions/clients';
import { needLoadPage } from 'helpers/utils';
import { notification } from 'ant-design';
import Detail from './components';

@dataConnect(
    (state) => {
        const locationState = state.router.location.state || {};
        const phone = locationState.phone || '18085192480';
        return {
            states: state.clients,
            phone,
            pageSize: 3,
        };
    },
    (dispatch) => ({
        actions : bindActionCreators(clientActions, dispatch),
    }),
    (props) => {
        return {
            fragments: Detail.fragments,
            variablesTypes: {
                client: {
                    phone: 'String!',
                },
                consumeRecords: {
                    pageNo: 'Int!',
                    pageSize: 'Int!',
                    phone: 'String!',
                },
            },
            initialVariables: {
                client: {
                    phone: props.phone,
                },
                consumeRecords: {
                    pageNo: 0,
                    pageSize: props.pageSize,
                    phone: props.phone,
                },
            },
        };
    }
)
export default class DetailContainer extends React.Component {
    getClientInfo (phone) {
        const { relate, pageSize } = this.props;
        relate.refresh({
            variables: {
                client: {
                    phone,
                },
                consumeRecords: {
                    pageNo: 0,
                    pageSize,
                    phone,
                },
            },
            callback (data) {
                if (!data.client) {
                    notification.error({ description: '没有该用户' });
                }
            },
        });
    }
    loadListPage (phone, pageNo) {
        const { relate, pageSize, consumeRecords } = this.props;
        if (needLoadPage(consumeRecords, pageNo, pageSize)) {
            relate.loadPage({
                variables: {
                    consumeRecords: {
                        pageNo,
                        pageSize,
                        phone,
                    },
                },
                property:'list',
            });
        }
    }
    render () {
        return (
            <Detail {...this.props}
                getClientInfo={::this.getClientInfo}
                loadListPage={::this.loadListPage} />
        );
    }
}
