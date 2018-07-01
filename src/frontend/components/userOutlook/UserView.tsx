import * as React from "react";
import { User as UserResponse } from "../../../api/interfaces/Response";
import { Card } from "antd";

export type UserViewProps = {
    user: UserResponse.IUser;
};

export const UserView = (props: UserViewProps) => {
    const renderUserData = {
        Name: props.user.name,
        Email: props.user.email,

        Separator0: "",

        Street: props.user.address.street,
        Suite: props.user.address.suite,
        City: props.user.address.city,
        Zipcode: props.user.address.zipcode,

        Separator1: "",

        Website: props.user.website,
        Phone: props.user.website,

        Separator2: "",

        "Company name": props.user.company.name
    };

    return (
        <div>
            <Card
                style={{ width: 240, position: "fixed" }}
                cover={
                    <img alt="example" width="100%" src={props.user.imageUrl} />
                }
            >
                {Object.keys(renderUserData).map((key, index) => {
                    const objectKey = key as keyof typeof renderUserData;
                    return objectKey
                        .toLocaleLowerCase()
                        .includes("separator") ? (
                        <hr
                            style={{ border: "1px solid #e9e9e9" }}
                            key={index}
                        />
                    ) : (
                        <div style={{ lineHeight: "25px" }} key={index}>
                            <span style={{ fontWeight: "bold" }}>
                                {" "}
                                {objectKey}:{" "}
                            </span>{" "}
                            {renderUserData[objectKey]}
                        </div>
                    );
                })}
            </Card>
            ,
        </div>
    );
};
