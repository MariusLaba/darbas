import InboxUserCard from './InboxUserCard'
import { useInboxStore } from '../store/inboxStore'

const InboxUsersContainer = () => {
    const inbox = useInboxStore((state) => state.inbox)

    return (
        <div className="bg-gray-900 h-[850px] rounded w-1/2 p-2 overflow-auto">
            {inbox.map((chat, idx) => (
                <InboxUserCard key={idx} chat={chat} />
            ))}
        </div>
    )
}

export default InboxUsersContainer