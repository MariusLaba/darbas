type TSingleCommentCardProps = {
    comment: {
        username: string
        comment: string
    }
}

const SingleCommentCard = ({ comment }: TSingleCommentCardProps) => {
    return (
        <div className="w-full bg-gray-700 mt-5 rounded">
            <h5 className="text-sm p-2">{comment.username}</h5>
            <p className="text-sm font-normal bg-gray-900 rounded-b p-2">
                {comment.comment}
            </p>
        </div>
    )
}

export default SingleCommentCard