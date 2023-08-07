export type TUser = {
    _id: string
    image: string
    username: string
}

export type TUserStore = {
    user: TUser | null
    userToken: string | null
    setUser: (data: TUser | null) => void
    setUserToken: (data: string) => void
}