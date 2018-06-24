import * as React from 'react';
import { PostView } from '../../components/userPosts/PostView';


export type UserProfileProps = {
    id: number
}

export class UserProfile extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    getUserPosts = () => {

    }

    render() {
        return (
            <div>
                <PostView post='oh some random text as a post' />
            </div>
        );
    }
}
