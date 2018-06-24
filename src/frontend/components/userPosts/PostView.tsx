import * as React from 'react';
import { User } from '../../../api/interfaces/Response';
import { Card, Row, Col, Button } from 'antd';

export type UserPostProps = {
    post: string
}

export class PostView extends React.Component<UserPostProps> {
    constructor(props: UserPostProps) {
        super(props);
    }

    render() {
        return (
            <div style={{ height: 300 }}>
                <Card title='Post'>
                    <div>
                        <Row>
                            <Col span={24}>
                                {this.props.post}
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div >
        )
    }
}
