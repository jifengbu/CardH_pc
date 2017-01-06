import React from 'react';
import Sidebar from './sidebar';
import Header from './header';

import styles from './index.less';

export default class App extends React.Component {
    static fragments = Header.fragments;
    selectSidebarMenuItem (current) {
        this.refs.sidebar.selectMenuItem(current);
    }
    render () {
        const { personal } = this.props;
        return (
            <div className={styles.container}>
                <Header personal={personal} selectSidebarMenuItem={::this.selectSidebarMenuItem} />
                <div className={styles.main}>
                    <Sidebar ref='sidebar' />
                    <div className={styles.content}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
    render1 () {
        return this.props.children;
    }
}
