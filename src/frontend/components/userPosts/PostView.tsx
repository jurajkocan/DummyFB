import * as React from "react";
import { Card, Row, Col, Button } from "antd";

export type UserPostProps = {
    post: string;
    createdByName: string;
};

export const PostView = (props: UserPostProps) => {
    return (
        <div style={{ marginBottom: 10 }}>
            <Card title={`created by: ${props.createdByName}`}>
                <div>
                    <Row>
                        <Col span={24}>{props.post}</Col>
                    </Row>
                </div>
            </Card>
        </div>
    );
};
