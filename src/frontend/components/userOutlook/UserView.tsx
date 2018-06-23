import * as React from 'react';
import { User } from '../../../api/interfaces/Response';

export interface UserViewProps {
    user: User.IUser
}

export class UserView extends React.Component<UserViewProps> {
    constructor(props: UserViewProps) {
        super(props);
    }

    render() {
        return (
            <div>
                email: {this.props.user.email}
                name: {this.props.user.name}
            </div>
        )
    }
}
