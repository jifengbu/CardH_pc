import React from 'react';
import { dataConnect } from 'relatejs';
import { bindActionCreators } from 'redux';
import * as testActions from 'actions/tests';
import Test from './components';

@dataConnect(
    (state, props) => ({ states: state.tests, keepData: false, pageSize: 3 }),
    (dispatch) => ({
        actions : bindActionCreators(testActions, dispatch),
    }),
    (props) => ({
        manualLoad: false,
        fragments: Test.fragments,
        variablesTypes: {
            count: {
                num: 'Int!',
            },
            list: {
                pageNo: 'Int!',
                pageSize: 'Int!',
            },
        },
        initialVariables: {
            count: {
                num: 0,
            },
            list: {
                pageNo: 0,
                pageSize: props.pageSize,
            },
        },
        mutations: {
            addCount ({ state, data }) {
                state.count += data;
            },
            addListItem ({ state, data }) {
                state.list.push(data);
            },
            removeListItem ({ state, data, _ }) {
                _.remove(state.list, (item) => item.id === data);
            },
        },
    })
)

export default class CountContainer extends React.Component {
    loadMore () {
        const { loading, relate, pageSize } = this.props;
        if (!loading && relate.hasMore) {
            relate.loadMore({
                variables: {
                    list: {
                        pageNo: relate.pageNo + 1,
                        pageSize,
                    },
                },
            });
        }
    }
    refresh () {
        const { relate } = this.props;
        this.props.relate.refresh({
            variables: {
                list: {
                    pageNo: 0,
                },
            },
        });
    }
    render () {
        return (
            <Test {...this.props}
                loadMore={::this.loadMore}
                refresh={::this.refresh}
                />
        );
    }
}
