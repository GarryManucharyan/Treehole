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
}

export interface CommentModel {
    dislikesCount: number,
    isDisliked?: boolean,
    likesCount: number,
    isLiked?: boolean,
    postId: number,
    email: string,
    body: string,
    id: number,
}