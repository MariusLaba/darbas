import { TUser } from './typesUserStore'

export type TInbox = {
    _id: string
    participants: TUser[]
    chat: {
        userId: string
        message: string | null
    }[]
}

export type TInboxStore = {
    inbox: TInbox[] | []
    selectedChat: TInbox | null
    setInbox: (data: TInbox[]) => void
    setSelectedChat: (data: TInbox | null) => void
}