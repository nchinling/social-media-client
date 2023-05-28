export interface Post{
    title: string
    comments: string  
}

export interface PostResponse{
    postId: string
    title: string
    comments: string
}

export interface Likes{
    postId: string
    count: number
}

export interface LikesResponse{
    postId: string
    total: number
}