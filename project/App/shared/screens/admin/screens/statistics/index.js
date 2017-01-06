import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clientActions from 'actions/clients';
import Statistics from './components';

// @connect(
//     (state) => ({ states: state.clients }),
//     (dispatch) => ({
//         actions : bindActionCreators(clientActions, dispatch),
//     }),
// )
export default class StatisticsContainer extends React.Component {
    render () {
        return (
            <Statistics {...this.props} />
        );
    }
}
