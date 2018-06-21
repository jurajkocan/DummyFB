import * as React from 'react';
import { connect } from 'react-redux';
import { FindUser } from './application/FindUser';
import { UserProfile } from './application/UserProfile';

interface MasterPageProps {
    currentPage: 'userProfile' | 'findFriends';
}

interface MasterPageState {

}

// TODO: props will be with app state
export class MasterPageComponent extends React.Component<MasterPageProps, MasterPageState> {
    constructor(props: MasterPageProps) {
        super(props);
    }

    getPage = () => {
        switch (this.props.currentPage) {
            case 'findFriends':
                return <FindUser />
            case 'userProfile':
                return <UserProfile />
        }
    }

    render() {
        return (
            <div>
                <div>Some navigation</div>
                {this.getPage()}
            </div>
        );
    }
}

export const MasterPage = connect(
    (store: any) => (store)
)(MasterPageComponent);
