import * as React from 'react';
import { Button, Input } from 'antd';
const { TextArea } = Input;


export interface PostCreateProps {
    fromUserId: number,
    toUserId: number,
    userAccessToken: string
}

export class PostCreate extends React.Component {
    render() {
        return (
            <div>
                <TextArea placeholder="U can write here your own post" autosize={{ minRows: 2, maxRows: 6 }} />
                <Button type='primary'>Send</Button>
            </div>
        )
    }
}
