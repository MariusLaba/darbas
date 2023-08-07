import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from 'react-icons/ai'
import { useUserStore } from '../store/userStore'
import axios from 'axios'
import { toast } from 'react-toastify'
import { IErrorBackend } from '../models/typesBackEndError'
import { TPost } from '../models/typesPostStore'

type TSinglePostCardProps = {
    post: TPost
}

const SinglePostCard = ({ post }: TSinglePostCardProps) => {
    const userToken = useUserStore((state) => state.userToken)
    const user = useUserStore((state) => state.user)
    const isLiked = post.likes.find((like) => like === user?._id)

    const handleLike = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/posts/like/${post._id}`,
                { headers: { Authorization: `${userToken}` } },
            )
            toast.success(data.message)
        } catch (error: unknown) {
            toast.error((error as IErrorBackend).response.data.message)
        }
    }

    return (
        <div className="max-w-full bg-gray-900 rounded-lg shadow flex flex-col lg:flex-row">
            <img className="rounded-t-lg lg:rounded-l-lg" src={post.image} alt="" />
            <div className="p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1 items-center">
                        <img
                            className="w-[30px] h-[30px] rounded-full"
                            src={post.userImage}
                            alt=""
                        />
                        <p className="text-sm mb-2">{post.username}</p>
                    </div>
                    <button className="text-sm font-bolder bg-gray-800 flex justify-center items-center cursor-pointer p-2 rounded hover:bg-gray-700 gap-10">
                        Send a message
                        <AiOutlineSend className="text-gray-500" />
                    </button>
                </div>
                <p className="mb-3 font-normal text-white text-sm mt-3">
                    {post.message}
                </p>
                <div>
                    <div
                        onClick={handleLike}
                        className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                        <span className="ml-1">{post.likes.length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePostCard