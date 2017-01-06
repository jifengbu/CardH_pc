import React from 'react';
import styles from './index.less';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

export default class Test extends React.Component {
    static fragments = {
        count: 1,
        list: {
            id: 1,
            name: 1,
        },
    };
    handleAdd (e) {
        e.preventDefault();
        const { actions } = this.props;
        // actions.addCount();
        // actions.addListItem('yun');
        this.props.loadMore();
    }
    handleSub (e) {
        e.preventDefault();
        // const { actions } = this.props;
        // actions.removeListItem(2);
        // this.props.relate.setKeepData({keepListIndex: 3});
        this.props.refresh();
        // actions.subCount();
        // this.props.relate.setVariables({});
        // this.props.loadMore();
    }
    render () {
        const { count = 0, list = [], keepListIndex } = this.props;
        return (
            <div className={styles.container}>
                <div> 数字 {count} </div>
                <div> 保存 {keepListIndex} </div>
                <FloatingActionButton onClick={::this.handleAdd}>
                    <ContentAdd />
                </FloatingActionButton>
                <FloatingActionButton onClick={::this.handleSub}>
                    <ContentRemove />
                </FloatingActionButton>
                {
                    list.map((o, i) => (
                        <div className={styles.row} key={i}>
                            <span>{o.id + ':' + o.name}</span>
                        </div>
                    ))
                }
            </div>
        );
    }
}
