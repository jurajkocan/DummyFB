import * as React from 'react';

export class FindUser extends React.Component<{ email: string }, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                from redux state there is email: {this.props.email}
                Find user... list of users with infinity scroll.. some buttons for add or whatever
            </div>
        );
    }
}
