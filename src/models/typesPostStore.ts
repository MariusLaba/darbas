export type TPost = {
    _id: string
    image: string
    message: string
    userId: string
    username: string
    userImage: string
    comments: []
    likes: []
    createdAt: Date
}

export type TPostStore = {
    posts: TPost[] | []
    setPosts: (data: TPost[]) => void
}