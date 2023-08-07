import { AiOutlineSend } from 'react-icons/ai'
import { TUsers } from '../pages/UsersPage'
import { useUserStore } from '../store/userStore'
import { TInbox } from '../models/typesInboxStore'
import { useInboxStore } from '../store/inboxStore'
import { useNavigate } from 'react-router-dom'

type TUserCardProps = {
    user: TUsers
}

const UserCard = ({ user }: TUserCardProps) => {
    const currentUser = useUserStore((state) => state.user)
    const { inbox, setInbox, setSelectedChat } = useInboxStore((state) => ({
        inbox: state.inbox,
        setInbox: state.setInbox,
        setSelectedChat: state.setSelectedChat,
    }))

    const navigate = useNavigate()

    const handleMessage = () => {
        if (currentUser) {
            const inboxPlaceholder: TInbox = {
                _id: 'placeholder',
                participants: [currentUser, user],
                chat: [
                    {
                        userId: currentUser._id,
                        message: '',
                    },
                ],
            }

            setInbox([
                inboxPlaceholder,
                ...inbox.filter((chat) => chat._id !== 'placeholder'),
            ])
            setSelectedChat(inboxPlaceholder)
            navigate('/inbox')
        }
    }

    return (
        <div className="flex bg-gray-900 p-2 rounded gap-2 flex-col justify-center items-center">
        <img
            className="rounded-full h-[150px] w-[150px]"
    src={user.image}
    alt=""
    />
    <div className="flex flex-col items-center gap-2 w-full">
    <p className="text-sm">{user.username}</p>
        <div className="text-sm font-normal bg-gray-800 w-full justify-center flex cursor-pointer p-2 rounded hover:bg-gray-700">
    <button
        className="text-white flex items-center gap-1 font-semibold"
    onClick={handleMessage}
        >
        Message <AiOutlineSend />
        </button>
        </div>
        </div>
        </div>
)
}

export default UserCard