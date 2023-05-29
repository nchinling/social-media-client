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
    plusCount: number
    minusCount: number
    
}

export interface LikesResponse{
    postId: string
    totalPlusCount: number
    totalMinusCount: number
}