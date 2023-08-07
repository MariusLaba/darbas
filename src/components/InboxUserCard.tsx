import { TInbox } from '../models/typesInboxStore'
import { useUserStore } from '../store/userStore'
import { useInboxStore } from '../store/inboxStore'

type TInboxUserCardProps = {
    chat: TInbox
}

const InboxUserCard = ({ chat }: TInboxUserCardProps) => {
    const currentUserId = useUserStore((state) => state.user?._id)
    const { selectedChat, setSelectedChat } = useInboxStore((state) => ({
        selectedChat: state.selectedChat,
        setSelectedChat: state.setSelectedChat,
    }))
    const inboxHolder = chat.participants.find(
        (participant) => participant._id !== currentUserId,
    )

    return (
        <div
            className={`h-[100px] flex rounded gap-3 items-center p-5 cursor-pointer hover:bg-gray-700 overflow-hidden mb-2 ${
                selectedChat?._id === chat._id ? 'bg-gray-700' : 'bg-gray-800'
            }`}
            onClick={() => setSelectedChat(chat)}
        >
            {inboxHolder && (
                <>
                    <img
                        className="rounded-full h-[40px]"
                        src={inboxHolder?.image}
                        alt=""
                    />
                    <div>
                        <p className="text-sm">{inboxHolder?.username}</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default InboxUserCard