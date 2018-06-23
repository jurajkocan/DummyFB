import * as React from 'react';
import { Menu, Layout, message } from 'antd';
import { Link } from 'react-router-dom';
import { style } from 'typestyle/lib';
import { IRootDescription, listUsersRoot, profileRoot } from '../../common/RootConstant';
import MenuItem from 'antd/lib/menu/MenuItem';
import axios from 'axios';

const { Header } = Layout;


const NavigationStyle = {
    NavigationWrapper: style({

    }),

    NavigationLogo: style({
        height: '43px',
        margin: '10px 24px 10px 24px',
        float: 'left'
    }),

    NavigationLogout: style({
        float: 'right',
        cursor: 'pointer',
        height: '31px',
        margin: '16px 24px 16px 24px',
    })

}

interface NavigationProps {
    defaultPage: IRootDescription
}

interface NavigationState {

}

export class Navigation extends React.Component<NavigationProps, NavigationState> {
    logOut = () => {
        // TODO: log out user
    }

    getDefaultMenuKey = () => {
        switch (this.props.defaultPage.rootName) {
            case 'userProfile':
                return ['1'];
            case 'listUsers':
                return ['2'];
        }
    }

    render() {
        const defaultMenuKey = this.getDefaultMenuKey();
        return (
            <div>
                <img className={NavigationStyle.NavigationLogo} src='/images/TomMenuLogo.png' />
                <div onClick={this.logOut} className={NavigationStyle.NavigationLogout}>
                    LogOut
                        </div>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={defaultMenuKey}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">
                        <Link to={profileRoot.rootUrl}>
                            Profile
                                </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={listUsersRoot.rootUrl}>
                            Find more friends
                                </Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}
