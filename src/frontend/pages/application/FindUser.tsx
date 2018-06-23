import * as React from 'react';
import { UserGrid } from '../../components/userOutlook/UserGrid';

export class FindUser extends React.Component<{ userAccessToken: string }, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <UserGrid userAccessToken={this.props.userAccessToken} />
            </div>
        );
    }
}
