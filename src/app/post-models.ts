export interface PostModel {
    id: number,
    title: string,
    body: string,
    comments: CommentModel[],
    userId: number,
    likesCount: number,
    dislikesCount: number,
    isLiked?: boolean | null,
}

export interface CommentModel {
    id: number,
    email: string,
    body: string,
    postId: number,
    likesCount: number,
    dislikesCount: number,
    isLiked?: boolean | null,
}