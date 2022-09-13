export interface PostResponseModel {
    userId: number,
    title: string,
    body: string,
    id: number
}

export interface PostModel {
    commentsCount: number,
    dislikesCount: number,
    isDisliked?: boolean,
    likesCount: number,
    isLiked?: boolean,
    userId: number,
    title: string,
    body: string,
    id: number
}
