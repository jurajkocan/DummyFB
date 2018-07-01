import * as React from "react";
import { Input } from "antd";
import {
    Post as PostResponse,
    User as UserResponse
} from "../../../api/interfaces/Response";
import { Post as PostRequest } from "../../../api/interfaces/Request";
import { style, keyframes } from "typestyle/lib";
import { PostGridItem } from "./PostGridItem";
import axios from "axios";
import { PostCreate } from "./PostCreate";

export namespace PostGridStyle {
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

export interface PostGridProps {
    userAccessToken: string;
    userId: number;
    currentUser: UserResponse.IUser;
}

export interface PostGridState {
    hasMoreItems: boolean;
    page: number;
    pageSize: number;
    searchText: string;
    posts: PostResponse.IPost[];
    isNewSearch: boolean;
    showLoading: boolean;
}

const Search = Input.Search;
const InfiniteScroll =
    typeof window !== "undefined" ? require("react-infinite-scroller") : null;

export class PostGrid extends React.Component<PostGridProps, PostGridState> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasMoreItems: true,
            page: 0,
            pageSize: 5,
            searchText: "",
            posts: [],
            isNewSearch: true,
            showLoading: false
        };
    }

    createPost = (text: string): boolean => {
        // Would be some call for backed to save into the db...
        this.setState({
            posts: [
                {
                    text: text,
                    createdById: this.props.currentUser.id,
                    createdByName: this.props.currentUser.name
                },
                ...this.state.posts
            ]
        });
        return true;
    };

    getPosts = async (
        userToken: string,
        userId: number,
        page: number,
        pageSize: number,
        searchText: string
    ) => {
        const payload: PostRequest.FilteredPosts = {
            page: page,
            pageSize: pageSize,
            userId: userId
        };
        try {
            const response = await axios.post(
                "/api/v1/post/filtered",
                payload,
                {
                    headers: {
                        Authorization: "Bearer " + userToken
                    }
                }
            );
            if (response.data) {
                const responsePosts = response.data as PostResponse.IPost[];
                return responsePosts;
            } else {
                return [];
            }
        } catch (err) {
            return [];
        }
    };

    loadMore = async () => {
        const page = this.state.page;
        const pageSize = this.state.pageSize;
        const searchText = this.state.searchText;
        const listPosts = await this.getPosts(
            this.props.userAccessToken,
            this.props.userId,
            page,
            pageSize,
            searchText
        );
        this.setState({
            posts: this.state.isNewSearch
                ? listPosts
                : this.state.posts.concat(listPosts),
            hasMoreItems: listPosts.length === pageSize,
            isNewSearch: false,
            page: page + 1,
            pageSize: pageSize,
            showLoading: false
        });
    };

    renderRows = () => {
        return this.state.posts.map((post, index) => {
            return (
                <PostGridItem
                    key={index}
                    post={post.text}
                    createdByName={post.createdByName}
                />
            );
        });
    };

    render() {
        return (
            <div style={{ width: "700px", marginLeft: "240px" }}>
                <div>
                    <div className={PostGridStyle.gridHead}>
                        <PostCreate onPostSend={this.createPost} />
                    </div>
                </div>
                <div>
                    {this.state.showLoading ? (
                        <div className={PostGridStyle.loader}> </div>
                    ) : (
                        ""
                    )}
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMoreItems}
                        loader={<div className={PostGridStyle.loader}> </div>}
                        useWindow={true}
                    >
                        {this.renderRows()}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}
