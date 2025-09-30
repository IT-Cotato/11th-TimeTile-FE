import { SearchPost } from "@/model/components/SearchType";
import { OtherPost } from "@/model/components/Post";

export const mapSearchPostToOtherPost = (posts: SearchPost[]): OtherPost[] => {
  return posts.map((post) => ({
    name: "",
    groupId: post.groupId,
    artistName: "",
    postId: post.postId,
    title: post.title,
    content: post.content,
    mainImageUrl: post.mainImageUrl,
    createdAt: post.createdAt,
    likeCount: post.likeCount,
    commentCount: post.commentCount,
    authorId: post.authorId,
    authorNickname: post.authorNickname,
    authorProfileImageUrl: post.authorProfileImageUrl,
  }));
};
