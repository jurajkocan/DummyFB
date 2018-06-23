import * as React from 'react';
import { connect } from 'react-redux';
import { FindUser } from './application/FindUser';
import { UserProfile } from './application/UserProfile';
import { ReduxState } from '../redux/State';
import { Navigation } from '../components/Navigation';
import { profileRoot } from '../../common/RootConstant';
import { Layout } from 'antd';
import { rootName } from '../../common/RootConstant';

interface MasterPageProps {
    currentPage: rootName
}

interface MasterPageState {

}

const { Header, Footer, Sider, Content } = Layout;
export class MasterPageComponent extends React.Component<MasterPageProps & ReduxState, MasterPageState> {
    constructor(props: MasterPageProps & ReduxState) {
        super(props);
    }

    getPage = () => {
        console.log(this.props.currentPage);
        switch (this.props.currentPage) {
            case 'listUsers':
                return <FindUser email={this.props.user.email} />
            case 'userProfile':
                return <UserProfile />
        }
    }

    render() {
        return (
            <div>
                <Navigation defaultPage={profileRoot} />
                <Content>{this.getPage()}}</Content>
            </div>
        );
    }
}

export const MasterPage = connect(
    (state: ReduxState) => { console.log('state: ', state); return state; }
)(MasterPageComponent);
