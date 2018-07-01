import * as React from "react";
import { Input } from "antd";
import { User as UserResponse } from "../../../api/interfaces/Response";
import { User as UserRequest } from "../../../api/interfaces/Request";
import { style, keyframes } from "typestyle/lib";
import { UserGridItem } from "./UserGridItem";
import axios from "axios";

export namespace UserGridStyle {
    export const loaderAnimation = keyframes({
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" }
    });

    export const loader = style({
        margin: "auto",
        border: "8px solid #f3f3f3",
        borderRadius: "50%",
        borderTop: "8px solid #3498db",
        width: "60px",
        height: "60px",
        animation: "spin 2s linear infinite",
        animationName: loaderAnimation,
        padding: "10px"
    });

    export const gridHead = style({
        marginBottom: 20
    });

    export const gridRow = style({
        marginBottom: 0
    });
}

export interface UserGridProps {
    userAccessToken: string;
}

export interface UserGridState {
    hasMoreItems: boolean;
    page: number;
    pageSize: number;
    searchText: string;
    users: UserResponse.IUser[];
    isNewSearch: boolean;
    showLoading: boolean;
}

const Search = Input.Search;
const InfiniteScroll =
    typeof window !== "undefined" ? require("react-infinite-scroller") : null;

export class UserGrid extends React.Component<UserGridProps, UserGridState> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasMoreItems: true,
            page: 0,
            pageSize: 5,
            searchText: "",
            users: [],
            isNewSearch: true,
            showLoading: false
        };
    }

    connectUser = () => {
        return true;
    };

    disconnectUser = () => {
        return true;
    };

    getUsers = async (
        userToken: string,
        page: number,
        pageSize: number,
        searchText: string
    ) => {
        const payload: UserRequest.FilteredUser = {
            page: page,
            pageSize: pageSize,
            searchText: searchText
        };
        try {
            const response = await axios.post(
                "/api/v1/user/filtered",
                payload,
                {
                    headers: {
                        Authorization: "Bearer " + userToken
                    }
                }
            );
            if (response.data) {
                const responseUsers = response.data as UserResponse.IUser[];
                return responseUsers;
            } else {
                return [];
            }
        } catch (e) {
            return [];
        }
    };

    searchUser = async (searchText: string) => {
        this.setState(
            {
                page: 0,
                pageSize: 5,
                searchText: searchText,
                isNewSearch: true,
                users: [],
                showLoading: true
            },
            this.loadMore
        );
    };

    loadMore = async () => {
        const page = this.state.page;
        const pageSize = this.state.pageSize;
        const searchText = this.state.searchText;
        const listUsers = await this.getUsers(
            this.props.userAccessToken,
            page,
            pageSize,
            searchText
        );

        this.setState({
            users: this.state.isNewSearch
                ? listUsers
                : this.state.users.concat(listUsers),
            hasMoreItems: listUsers.length === pageSize,
            isNewSearch: false,
            page: page + 1,
            pageSize: pageSize,
            showLoading: false
        });
    };

    renderRows = () => {
        return this.state.users.map((user, index) => {
            return (
                <UserGridItem
                    onConnect={this.connectUser}
                    onDisconnect={this.disconnectUser}
                    key={index}
                    user={user}
                />
            );
        });
    };

    render() {
        return (
            <div>
                <div>
                    <div className={UserGridStyle.gridHead}>
                        <Search
                            placeholder="Full text user search"
                            onSearch={this.searchUser}
                            size="large"
                        />
                    </div>
                </div>
                <div>
                    {this.state.showLoading ? (
                        <div className={UserGridStyle.loader} />
                    ) : (
                        ""
                    )}
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMoreItems}
                        loader={<div className={UserGridStyle.loader} />}
                        useWindow={true}
                    >
                        {this.renderRows()}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}
