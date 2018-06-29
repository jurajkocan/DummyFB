import * as React from "react";
import { Menu, Layout, message } from "antd";
import { Link } from "react-router-dom";
import { style } from "typestyle/lib";
import {
    IRootDescription,
    listUsersRoot,
    profileRoot,
    rootName
} from "../../common/RootConstant";
import MenuItem from "antd/lib/menu/MenuItem";
import axios from "axios";

const { Header } = Layout;

const NavigationStyle = {
    NavigationWrapper: style({}),

    NavigationLogo: style({
        height: "43px",
        margin: "10px 24px 10px 24px",
        float: "left"
    }),

    NavigationLogout: style({
        float: "right",
        cursor: "pointer",
        height: "31px",
        margin: "16px 24px 16px 24px"
    })
};

interface NavigationProps {
    selectedPage: rootName;
}

interface NavigationState {}

export class Navigation extends React.Component<
    NavigationProps,
    NavigationState
> {
    logOut = () => {
        window.location.href = "/security/logout";
    };

    getSelectedMenuKey = () => {
        switch (this.props.selectedPage) {
            case "userProfile":
                return ["1"];
            case "listUsers":
                return ["2"];
            default:
                return [""];
        }
    };

    render() {
        return (
            <div>
                <img
                    className={NavigationStyle.NavigationLogo}
                    src="/images/TomMenuLogo.png"
                />
                <div
                    onClick={this.logOut}
                    className={NavigationStyle.NavigationLogout}
                >
                    LogOut
                </div>
                <Menu
                    theme="light"
                    mode="horizontal"
                    selectedKeys={this.getSelectedMenuKey()}
                    style={{ lineHeight: "64px" }}
                >
                    <Menu.Item key="1">
                        <Link to={profileRoot.rootUrl}>Profile</Link>
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
