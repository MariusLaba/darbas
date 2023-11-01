import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { TPost } from '../models/typesPostStore'
import axios from 'axios'
import { toast } from 'react-toastify'
import { IErrorBackend } from '../models/typesBackEndError'
import { useUserStore } from '../store/userStore'


type TCardProps = {
    post: TPost
}

const Card = ({ post }: TCardProps) => {
    const userToken = useUserStore((state) => state.userToken)
    const user = useUserStore((state) => state.user)
    const isLiked = post.likes.find((like) => like === user?._id)



    return (
        <div className="max-w-sm bg-gray-900 rounded-lg shadow">
            <img
                className="rounded-t-lg h-[250px] w-[400px]"
                src={post.image}
                alt=""
            />
            <div className="p-5">
                <div className="flex gap-2 items-center">
                    <img
                        className="w-[30px] h-[30px] rounded-full"
                        src={post.userImage}
                        alt=""
                    />
                    <p className="text-sm mb-2">{post.username}</p>
                </div>
                <Link
                    to={`post/${post._id}`}
                    className="mb-3 font-normal text-white text-sm mt-3 line-clamp-5"
                >
                    {post.message}
                </Link>
                <div className="flex gap-2 ">
                    <div

                        className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                        <span className="ml-1">{post.likes.length}</span>
                    </div>
                    <Link
                        to={`/post/${post._id}`}
                        className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        <AiOutlineComment />
                        <span className="ml-1">{post.comments.length}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card