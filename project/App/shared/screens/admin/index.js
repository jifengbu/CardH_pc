import React from 'react';
import { bindActionCreators } from 'redux';
import { rootDataConnect, dataConnect } from 'relatejs';
import Admin from './components';
@rootDataConnect()
export default class AdminContainer extends React.Component {
    render () {
        return (
            <Admin {...this.props}>
                {this.props.children}
            </Admin>
        );
    }
}
