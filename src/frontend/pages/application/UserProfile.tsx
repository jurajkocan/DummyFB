import * as React from "react";
import { PostGrid } from "../../components/userPosts/PostGrid";
import { User as UserResponse } from "../../../api/interfaces/Response";

export type UserProfileProps = {
    userAccessToken: string;
    id: number;
    currentUser: UserResponse.IUser;
};

export class UserProfile extends React.Component<UserProfileProps, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <PostGrid
                    userAccessToken={this.props.userAccessToken}
                    userId={this.props.id}
                    currentUser={this.props.currentUser}
                />
            </div>
        );
    }
}
