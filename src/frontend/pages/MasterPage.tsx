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
                return <FindUser userAccessToken={this.props.user.userToken} />
            case 'userProfile':
                return <UserProfile userAccessToken={this.props.user.userToken} id={this.props.user.id}
                />
        }
    }

    render() {
        return (
            <div>
                <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 100 }}>
                    <Navigation defaultPage={profileRoot} />
                </div>
                <div style={{ width: 700, marginLeft: 'auto', marginRight: 'auto', marginTop: 70 }}>
                    {this.getPage()}
                </div>
            </div>
        );
    }
}

export const MasterPage = connect(
    (state: ReduxState) => { console.log('state: ', state); return state; }
)(MasterPageComponent);
