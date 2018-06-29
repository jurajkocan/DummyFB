import { Post } from "../schema/Post";
import { getFakePostContent } from "../../common/FakeUserPosts";

export const getPosts = (postId?: number, userId?: number) => {
    //where userId = userId or postId = postId ect if there would be any db
    if (postId) {
        return getFakePostContent(50);
    } else if (userId) {
        return getFakePostContent(50);
    } else {
        throw "postId or userId parameter has to be provided";
    }
};
