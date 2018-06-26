import * as React from 'react';
import { User } from '../../../api/interfaces/Response';
import { Card, Row, Col, Button } from 'antd';

export type UserViewProps = {
    user: User.IUser
    onConnect: (userId: number) => boolean,
    onDisconnect: (userId: number) => boolean
}

export type UserViewState = {
    isConnected: boolean
}

export class UserView extends React.Component<UserViewProps, UserViewState> {
    constructor(props: UserViewProps) {
        super(props);
        this.state = {
            isConnected: this.props.user.isConnected
        }
    }

    connectUser = () => {
        const status = this.props.onConnect(this.props.user.id);
        if (status) {
            this.setState({
                isConnected: true
            });
        }
    }

    disconnectUser = () => {
        const status = this.props.onDisconnect(this.props.user.id);
        if (status) {
            this.setState({
                isConnected: false
            });
        }
    }

    seeProfile = () => {
        window.location.href = 'profile';
    }

    render() {
        return (
            <div style={{ height: 300 }}>
                <Card title='User'>
                    <div>
                        <Row>
                            <Col span={6}>
                                <img alt='oops something is wrong' src={this.props.user.imageUrl} />
                            </Col>
                            <Col span={9}>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}> name: </span> {this.props.user.name}
                                </div>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}> email: </span> {this.props.user.email}
                                </div>
                            </Col>
                            <Col span={9}>
                                <div style={{ float: 'right' }}>
                                    {
                                        this.state.isConnected
                                            ?
                                            <div>
                                                <Button style={{ marginRight: 10 }} type='danger' onClick={this.disconnectUser}>
                                                    disconnect
                                                </Button>
                                                <Button type='ghost' onClick={this.seeProfile}>
                                                    see profile
                                                </Button>
                                            </div>
                                            :
                                            <Button type='primary' onClick={this.connectUser}>
                                                connect
                                            </Button>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div >
        )
    }
}
