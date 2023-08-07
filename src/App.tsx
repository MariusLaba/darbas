import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import MainPage from './pages/MainPage'
import SideBar from './components/SideBar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import InboxPage from './pages/InboxPage'
import UsersPage from './pages/UsersPage'
import { ToastContainer } from 'react-toastify'
import { useUserStore } from './store/userStore'
import { useEffect, useState } from 'react'
import EditProfileModal from './components/EditProfileModal'
import SinglePostPage from './pages/SinglePostPage'
import CreatePostModal from './components/CreatePostModal'
import { io } from 'socket.io-client'

export const socket = io('http://localhost:8080', {
    autoConnect: true,
})

function App() {
    const user = useUserStore((state) => state.user)
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)
    const [showCreatePostModal, setShowCreatePostModal] = useState(false)

    useEffect(() => {
        socket.on('connect', () => {})
    }, [])

    return (
        <>
            {!user ? (
                <MainPage />
            ) : (
                <div className="flex text-white">
                    <SideBar
                        setShowEditProfileModal={setShowEditProfileModal}
                        setShowCreatePostModal={setShowCreatePostModal}
                    />
                    <div className="p-7 text-2xl font-semibold flex-1 h-screen bg-gray-800 overflow-auto">
                        <Routes>
                            <Route path={'/'} element={<HomePage />} />
                            <Route path={'/inbox'} element={<InboxPage />} />
                            <Route path={'/users'} element={<UsersPage />} />
                            <Route path={'/post/:post_id'} element={<SinglePostPage />} />
                        </Routes>
                        <EditProfileModal
                            showEditProfileModal={showEditProfileModal}
                            setShowEditProfileModal={setShowEditProfileModal}
                        />
                        <CreatePostModal
                            showCreatePostModal={showCreatePostModal}
                            setShowCreatePostModal={setShowCreatePostModal}
                        />
                    </div>
                </div>
            )}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                limit={1}
            />
        </>
    )
}

export default App