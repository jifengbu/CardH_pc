import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'ant-design';
import styles from './header.less';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

export default class Header extends React.Component {
    handleClick ({ key }) {
        if (key == 0 || key == 2) {
            this.props.selectSidebarMenuItem('0');
        } else if (key == 1) {
            this.props.selectSidebarMenuItem('2');
        }
    }
    render () {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <img src='http://localhost:3002/img/0.jpg' className={styles.head} />
                    <div className={styles.infoContainer}>
                        <div className={styles.name}>
                            贵州单用途预付卡管理平台
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <Menu className={styles.menu} mode='horizontal' onClick={::this.handleClick}>
                        <MenuItem key='0'>
                            <Link to='/admin/notify'>
                                <Icon type='info-circle-o' />
                                新消息
                            </Link>
                        </MenuItem>
                        <MenuDivider key={'_0'} className={styles.line} />
                        <MenuItem key='1'>
                            <Link to='/admin/feedback'>
                                <Icon type='question' />
                                意见反馈
                            </Link>
                        </MenuItem>
                        <MenuDivider key={'_1'} className={styles.line} />
                        <MenuItem key='2'>
                            <a href='/admin/logout'>
                                <Icon type='logout' />
                                退出
                            </a>
                        </MenuItem>
                    </Menu>
                    <div className={styles.company}>
                        贵州信合融通信息产业有限公司
                    </div>
                </div>
            </div>
        );
    }
}
