import * as React from "react";
import { Menu, Layout, message } from "antd";
import { Link } from "react-router-dom";
import { style } from "typestyle/lib";
import {
    listUsersRoot,
    profileRoot,
    rootName
} from "../../common/RootConstant";

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

export const Navigation = (props: NavigationProps) => {
    const logOut = () => {
        window.location.href = "/security/logout";
    };

    const getSelectedMenuKey = () => {
        switch (props.selectedPage) {
            case "userProfile":
                return ["1"];
            case "listUsers":
                return ["2"];
            default:
                return [""];
        }
    };

    return (
        <div>
            <img
                className={NavigationStyle.NavigationLogo}
                src="/images/TomMenuLogo.png"
            />
            <div onClick={logOut} className={NavigationStyle.NavigationLogout}>
                LogOut
            </div>
            <Menu
                theme="light"
                mode="horizontal"
                selectedKeys={getSelectedMenuKey()}
                style={{ lineHeight: "64px" }}
            >
                <Menu.Item key="1">
                    <Link to={profileRoot.rootUrl}>Profile</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={listUsersRoot.rootUrl}>Find more friends</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
};
