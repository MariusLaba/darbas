import Card from '../components/Card'
import { useEffect } from 'react'
import axios from 'axios'
import { useUserStore } from '../store/userStore'
import { usePostStore } from '../store/postStore'
import FilterBar from '../components/FilterBar'
import { toast } from 'react-toastify'
import { IErrorBackend } from '../models/typesBackEndError'
import { useInboxStore } from '../store/inboxStore'

const HomePage = () => {
    const { userToken, user } = useUserStore((state) => ({
        userToken: state.userToken,
        user: state.user,
    }))
    const { posts, setPosts } = usePostStore((state) => ({
        posts: state.posts,
        setPosts: state.setPosts,
    }))
    const setInbox = useInboxStore((state) => state.setInbox)

    const getPosts = async () => {
        const { data } = await axios.get('http://localhost:8080/api/posts/get', {
            headers: { Authorization: `${userToken}` },
        })

        return setPosts(data.posts)
    }

    const getInbox = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/chat/get/inbox/${user?._id}`,
                { headers: { Authorization: `${userToken}` } },
            )
            setInbox(data.inbox)
        } catch (error) {
            toast.error((error as IErrorBackend).response.data.message)
        }
    }

    useEffect(() => {
        getPosts()
        getInbox()
    }, [])

    return (
        <>
            <FilterBar />
            <div className="flex flex-wrap gap-5 mx-auto">
                {posts.map((post) => (
                    <Card key={post._id} post={post} />
                ))}
            </div>
        </>
    )
}

export default HomePage