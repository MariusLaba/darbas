import { useUserStore } from '../store/userStore'

type TInboxMessageProps = {
    chatMessage: {
        userId: string
        message: string | null
    }
}

const InboxMessage = ({ chatMessage }: TInboxMessageProps) => {
    const user = useUserStore((state) => state.user)

    return (
        <>
            {chatMessage.message && user ? (
                <div
                    className={`rounded p-2 w-fit max-w-[50%] ${
                        chatMessage.userId === user._id
                            ? 'self-end bg-gray-800'
                            : 'bg-gray-900'
                    }`}
                >
                    <p className="font-thin text-sm">{chatMessage.message}</p>
                </div>
            ) : (
                <p className="text-center text-sm font-normal"> No messages</p>
            )}
        </>
    )
}

export default InboxMessage