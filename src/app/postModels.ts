export interface PostModel {
    dislikesCount: number,
    isDisliked?: boolean,
    likesCount: number,
    isLiked?: boolean,
    userId: number,
    title: string,
    body: string,
    id: number,
    comments: CommentModel[],
    isCommentsGot: boolean,
    showComments: boolean,
    commentsCount: number,
}

export interface CommentModel {
    dislikesCount: number,
    isDisliked?: boolean,
    likesCount: number,
    isLiked?: boolean,
    postId: number,
    title: string,
    email: string,
    body: string,
    id: number,
}