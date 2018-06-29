import * as React from "react";
import { User } from "../../../api/interfaces/Response";
import { Card, Row, Col, Button } from "antd";

export type UserViewProps = {
    user: User.IUser;
    onConnect: (userId: number) => boolean;
    onDisconnect: (userId: number) => boolean;
};

export type UserViewState = {
    isConnected: boolean;
};

export class UserView extends React.Component<UserViewProps, UserViewState> {
    constructor(props: UserViewProps) {
        super(props);
        this.state = {
            isConnected: this.props.user.isConnected
        };
    }

    connectUser = () => {
        const status = this.props.onConnect(this.props.user.id);
        if (status) {
            this.setState({
                isConnected: true
            });
        }
    };

    disconnectUser = () => {
        const status = this.props.onDisconnect(this.props.user.id);
        if (status) {
            this.setState({
                isConnected: false
            });
        }
    };

    seeProfile = () => {
        window.location.href = `profile?userId=${this.props.user.id}`;
    };

    render() {
        const renderUserData = {
            Email: this.props.user.email,
            City: this.props.user.address.city,
            Website: this.props.user.website,
            Phone: this.props.user.website,
            "Company name": this.props.user.company.name
        };

        return (
            <div style={{ marginBottom: 10 }}>
                <Card title={this.props.user.name}>
                    <div>
                        <Row>
                            <Col span={6}>
                                <img
                                    alt="oops something is wrong"
                                    src={this.props.user.imageUrl}
                                />
                            </Col>
                            <Col span={9}>
                                {Object.keys(renderUserData).map(key => {
                                    const objectKey = key as keyof typeof renderUserData;
                                    return (
                                        <div>
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                {" "}
                                                {objectKey}:{" "}
                                            </span>{" "}
                                            {renderUserData[objectKey]}
                                        </div>
                                    );
                                })}
                            </Col>
                            <Col span={9}>
                                <div style={{ float: "right" }}>
                                    {this.state.isConnected ? (
                                        <div>
                                            <Button
                                                style={{ marginRight: 10 }}
                                                type="danger"
                                                onClick={this.disconnectUser}
                                            >
                                                disconnect
                                            </Button>
                                            <Button
                                                type="ghost"
                                                onClick={this.seeProfile}
                                            >
                                                see profile
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            type="primary"
                                            onClick={this.connectUser}
                                        >
                                            connect
                                        </Button>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        );
    }
}
