import { AiOutlineComment } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { commentSchema, TCommentSchema } from '../models/typesForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { IErrorBackend } from '../models/typesBackEndError'
import axios from 'axios'
import { useUserStore } from '../store/userStore'

type TCommentFormProps = {
    postId: string
}

const CommentForm = ({ postId }: TCommentFormProps) => {
    const userToken = useUserStore((state) => state.userToken)

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        reset,
    } = useForm<TCommentSchema>({
        mode: 'onBlur',
        resolver: zodResolver(commentSchema),
    })

    const onSubmit = async (commentData: TCommentSchema) => {
        try {
            const { data } = await axios.post(
                `http://localhost:8080/api/posts/comment/${postId}`,
                { ...commentData },
                { headers: { Authorization: `${userToken}` } },
            )

            toast.success(data.message)
            reset()
        } catch (error: unknown) {
            toast.error((error as IErrorBackend).response.data.message)
        }
    }

    return (
        <div className="mt-5">
            <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <textarea
            placeholder="Write"
            {...register('comment')}
            className="px-4 py-2 rounded-l bg-gray-900 focus:outline-0 text-white bg-opacity-80 text-sm w-3/4 h-[100px]"
        ></textarea>
                <button
                    type="submit"
                    className="px-4 py-2 rounded-r bg-gray-700 focus:outline-0 text-white bg-opacity-80 hover:bg-gray-600"
                    disabled={isSubmitting}
                >
                    <AiOutlineComment />
                </button>
                {errors.comment ? (
                    <p className="text-red-500 text-sm text-center flex items-center ml-5">{`${errors.comment.message}`}</p>
                ) : (
                    <p className="h-[20px]"></p>
                )}
            </form>
        </div>
    )
}

export default CommentForm