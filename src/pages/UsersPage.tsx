import UserCard from '../components/UserCard'
import axios from 'axios'
import { useUserStore } from '../store/userStore'
import { useEffect, useState } from 'react'

export type TUsers = {
    _id: string
    username: string
    image: string
}

const UsersPage = () => {
    const userToken = useUserStore((state) => state.userToken)
    const [allUsers, setAllUsers] = useState<TUsers[] | undefined>(undefined)

    const getUsers = async () => {
        const { data } = await axios.get('http://localhost:8080/api/users/get', {
            headers: { Authorization: `${userToken}` },
        })

        setAllUsers(data.users)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="flex flex-wrap gap-2">
            {allUsers &&
                allUsers.map((user) => <UserCard key={user._id} user={user} />)}
        </div>
    )
}

export default UsersPage