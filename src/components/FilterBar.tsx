import { usePostStore } from '../store/postStore'

const FilterBar = () => {
    const { posts, setPosts } = usePostStore((state) => ({
        posts: state.posts,
        setPosts: state.setPosts,
    }))

    const handleFilter = (filterName: string) => {
        switch (filterName) {
            case 'Likes':
                setPosts(
                    posts.sort(function (a, b) {
                        return b.likes.length - a.likes.length
                    }),
                )
                break
            case 'Comments':
                setPosts(
                    posts.sort(function (a, b) {
                        return b.comments.length - a.comments.length
                    }),
                )
                break
            case 'Date':
                setPosts(
                    posts.sort((a, b) => {
                        return (
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                        )
                    }),
                )
                break
            default:
        }
    }

    return (
        <div className="flex mb-5 gap-2">
            <p className="text-sm font-bolder flex items-center justify-center">
                Filters
            </p>
            <button
                className="text-sm font-bolder bg-gray-900 cursor-pointer p-2 rounded hover:bg-gray-700"
                onClick={() => handleFilter('Likes')}
            >
                Likes
            </button>
            <button
                className="text-sm font-bolder bg-gray-900 cursor-pointer p-2 rounded hover:bg-gray-700"
                onClick={() => handleFilter('Comments')}
            >
                Comments
            </button>
            <button
                className="text-sm font-bolder bg-gray-900 cursor-pointer p-2 rounded hover:bg-gray-700"
                onClick={() => handleFilter('Date')}
            >
                Date
            </button>
        </div>
    )
}

export default FilterBar