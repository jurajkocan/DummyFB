import * as React from 'react';
import { PostGrid } from '../../components/userPosts/PostGrid';


export type UserProfileProps = {
    userAccessToken: string,
    id: number
}

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
                />
            </div>
        );
    }
}
