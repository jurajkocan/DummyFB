import * as React from "react";
import { UserGrid } from "../../components/userOutlook/UserGrid";

export const FindUser = (props: { userAccessToken: string }) => {
    return (
        <div
            style={{
                width: "700px",
                marginLeft: "auto",
                marginRight: "auto"
            }}
        >
            <UserGrid userAccessToken={props.userAccessToken} />
        </div>
    );
};
