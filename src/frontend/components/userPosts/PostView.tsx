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
            <div style={{ marginBottom: 10 }}>
                <Card title='Post'>
                    <div>
                        <Row>
                            <Col span={24}>
                                nadtym dakde email kto ho vytvoril abo name
                                {this.props.post}
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div >
        )
    }
}
