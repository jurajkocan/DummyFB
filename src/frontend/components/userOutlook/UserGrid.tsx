import * as React from 'react';
import { Input } from 'antd';
import { User as UserResponse } from '../../../api/interfaces/Response';
import { User as UserRequest } from '../../../api/interfaces/Request';
import { style, keyframes } from 'typestyle/lib';
import { UserView } from './UserView';
import axios from 'axios';

export namespace UserGridStyle {
    export const loaderAnimation = keyframes({
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
    })

    export const loader = style({
        margin: 'auto',
        border: '8px solid #f3f3f3',
        borderRadius: '50%',
        borderTop: '8px solid #3498db',
        width: '60px',
        height: '60px',
        animation: 'spin 2s linear infinite',
        animationName: loaderAnimation,
        padding: '10px',
    });

    export const gridHead = style({
        marginBottom: 20,
    });

    export const gridRow = style({
        marginBottom: 20,
    });
}

export interface UserGridProps {
    userAccessToken: string
}

export interface UserGridState {
    hasMoreItems: boolean
    page: number,
    pageSize: number,
    searchText: string,
    users: UserResponse.IUser[],
    isNewSearch: boolean,
    showLoading: boolean,
}

const Search = Input.Search;
const InfiniteScroll = typeof window !== 'undefined' ? require('react-infinite-scroller') : null;

export class UserGrid extends React.Component<UserGridProps, UserGridState> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasMoreItems: true,
            page: 0,
            pageSize: 10,
            searchText: '',
            users: [],
            isNewSearch: true,
            showLoading: false
        }
    }

    getUsers = async (userToken: string, page: number, pageSize: number, searchText: string) => {
        const payload: UserRequest.FilteredUser = {
            page: page,
            pageSize: pageSize,
            searchText: searchText
        }
        const response = await axios.post('/api/v1/user/filtered', payload, {
            headers: {
                'Authorization': 'Bearer ' + userToken,
            }
        });
        if (response.data) {
            const responseUsers = response.data as UserResponse.IUser[]
            return responseUsers;
        }
        else {
            return [];
        }
    }

    searchUser = async () => {
        const page = this.state.page;
        const pageSize = this.state.pageSize;
        const searchText = this.state.searchText;
        const listUsers = await this.getUsers(this.props.userAccessToken, page, pageSize, searchText);
        this.setState({
            users: this.state.isNewSearch ? listUsers : this.state.users.concat(listUsers),
            hasMoreItems: listUsers.length === pageSize,
            isNewSearch: false,
            page: page + 1,
            pageSize: pageSize + pageSize,
            showLoading: false
        });
    }

    loadMore = async () => {
        const page = this.state.page;
        const pageSize = this.state.pageSize;
        const searchText = this.state.searchText;
        const listUsers = await this.getUsers(this.props.userAccessToken, page, pageSize, searchText);
        this.setState({
            users: this.state.isNewSearch ? listUsers : this.state.users.concat(listUsers),
            hasMoreItems: listUsers.length === pageSize,
            isNewSearch: false,
            page: page + 1,
            pageSize: pageSize + pageSize,
            showLoading: false
        });
    }

    renderRows = () => {
        return this.state.users.map((user, index) => {
            return (
                <UserView
                    user={user}
                />
            )
        })
    }

    scroll = () => {
        return (
            <div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMoreItems}
                    loader={<div className={UserGridStyle.loader}></div>}
                    useWindow={true}
                >
                    {this.renderRows()}
                </InfiniteScroll>
            </div>
        )
    }

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
                    {this.state.showLoading ? <div className={UserGridStyle.loader}></div> : ''}
                    {this.scroll()}
                </div>
            </div>
        )
    }
}
