import * as React from "react";
import { PostGrid } from "../../components/userPosts/PostGrid";
import { User as UserResponse } from "../../../api/interfaces/Response";
import { UserView } from "../../components/userOutlook/UserView";

export type UserProfileProps = {
    userAccessToken: string;
    user: UserResponse.IUser;
    currentUser: UserResponse.IUser;
};

export class UserProfile extends React.Component<UserProfileProps, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    width: "940px",
                    position: "absolute",
                    left: "-120px",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <UserView user={this.props.user} />
                <PostGrid
                    userAccessToken={this.props.userAccessToken}
                    userId={this.props.user.id}
                    currentUser={this.props.currentUser}
                />
            </div>
        );
    }
}
