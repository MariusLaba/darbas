import { HiArrowCircleLeft } from 'react-icons/hi'
import {
    AiFillPlusSquare,
    AiOutlineHome,
    AiOutlineInbox,
    AiOutlineUser,
} from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/userStore'

type TSideBarProps = {
    setShowEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>
    setShowCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBar = ({
                     setShowEditProfileModal,
                     setShowCreatePostModal,
                 }: TSideBarProps) => {
    const [openMenu, setOpenMenu] = useState(false)
    const { user, setUser } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
    }))

    const logOut = () => {
        setUser(null)
    }

    return (
        <div
            className={`${
                openMenu ? 'w-52' : 'w-20'
            } duration-300 h-screen relative p-5 pt-8 shadow-xl`}
        >
            <HiArrowCircleLeft
                size="3em"
                className={`absolute cursor-pointer -right-6 top-9 rounded-full bg-gray-900 duration-300 hidden md:block ${
                    !openMenu && 'rotate-180'
                }`}
                onClick={() => setOpenMenu(!openMenu)}
            />
            <Link className="flex gap-x-4 items-center" to="/">
                <img
                    className={`duration-500 w-[35px] h-[35px]`}
                    src="https://images.squarespace-cdn.com/content/v1/64b01b7f5312692724db8739/a2c54d31-22bd-492c-8c50-726a20448ff7/ChiAlpha_Icon_White.png"
                    alt=""
                />

                <h1
                    className={`text-white origin-left font-medium text-xl duration-300 ${
                        !openMenu && 'scale-0'
                    }`}
                >
                    ConnectHub
                </h1>
            </Link>
            <ul className="pt-6">
                <Link
                    to="/"
                    className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-800 rounded-md"
                >
                    <AiOutlineHome size="1.7em" />
                    <span className={`${!openMenu && 'hidden'} origin-left duration-300`}>
            Home
          </span>
                </Link>
                <Link
                    to="/inbox"
                    className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-800 rounded-md"
                >
                    <AiOutlineInbox size="1.7em" />
                    <span className={`${!openMenu && 'hidden'} origin-left duration-300`}>
            Inbox
          </span>
                </Link>
                <Link
                    to="/users"
                    className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-800 rounded-md"
                >
                    <AiOutlineUser size="1.7em" />
                    <span className={`${!openMenu && 'hidden'} origin-left duration-300`}>
            Users
          </span>
                </Link>
                <li
                    className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-800 rounded-md mt-10"
                    onClick={() => setShowCreatePostModal(true)}
                >
                    <AiFillPlusSquare size="1.7em" />
                    <span className={`${!openMenu && 'hidden'} origin-left duration-300`}>
            Post
          </span>
                </li>

                <li
                    className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-800 rounded-md mt-10"
                    onClick={() => setShowEditProfileModal(true)}
                >
                    <img
                        className="w-[24px] h-[24px] rounded-full"
                        src={user?.image}
                        alt=""
                    />
                    <span className={`${!openMenu && 'hidden'} origin-left duration-300`}>
            {user?.username}
          </span>
                </li>

                <li
                    className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-800 rounded-md mt-10"
                    onClick={logOut}
                >
                    <BiLogOut size="1.7em" />
                    <span className={`${!openMenu && 'hidden'} origin-left duration-300`}>
            Logout
          </span>
                </li>
            </ul>
        </div>
    )
}

export default SideBar