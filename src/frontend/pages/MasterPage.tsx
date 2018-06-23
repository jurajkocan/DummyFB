import * as React from 'react';
import { connect } from 'react-redux';
import { FindUser } from './application/FindUser';
import { UserProfile } from './application/UserProfile';
import { ReduxState } from '../redux/State';

interface MasterPageProps {
    currentPage: 'userProfile' | 'findFriends';
}

interface MasterPageState {

}

// TODO: props will be with app state
export class MasterPageComponent extends React.Component<MasterPageProps & ReduxState, MasterPageState> {
    constructor(props: MasterPageProps & ReduxState) {
        super(props);
    }

    getPage = () => {
        console.log(this.props.currentPage);
        switch (this.props.currentPage) {
            case 'findFriends':
                return <FindUser email={this.props.user.email} />
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
    (state: ReduxState) => { console.log('state: ', state); return state; }
)(MasterPageComponent);
