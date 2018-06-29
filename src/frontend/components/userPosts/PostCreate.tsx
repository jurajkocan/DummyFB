import * as React from "react";
import { Button, Input } from "antd";
const { TextArea } = Input;

export interface PostCreateProps {
    onPostSend: (postText: string) => boolean;
}

export interface PostCreateState {
    postText: string;
}

export class PostCreate extends React.Component<
    PostCreateProps,
    PostCreateState
> {
    constructor(props: PostCreateProps) {
        super(props);
        this.state = {
            postText: ""
        };
    }

    onPostSend = () => {
        if (this.props.onPostSend(this.state.postText)) {
            this.setState({
                postText: ""
            });
        }
    };

    onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            postText: event.currentTarget.value
        });
    };

    render() {
        return (
            <div>
                <TextArea
                    value={this.state.postText}
                    onChange={this.onTextChange}
                    placeholder="U can write here your own post"
                    autosize={{ minRows: 4, maxRows: 12 }}
                />
                <div>
                    <Button
                        style={{ width: "100%", marginTop: 10 }}
                        type="primary"
                        onClick={this.onPostSend}
                        disabled={this.state.postText === ""}
                    >
                        Send
                    </Button>
                </div>
            </div>
        );
    }
}
