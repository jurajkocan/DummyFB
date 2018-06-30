import * as React from "react";
import { UserGrid } from "../../components/userOutlook/UserGrid";

export const FindUser = (props: { userAccessToken: string }) => {
    return (
        <div>
            <UserGrid userAccessToken={props.userAccessToken} />
        </div>
    );
};
