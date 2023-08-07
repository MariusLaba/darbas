import React from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema, TLoginSchema } from '../models/typesForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiOutlineClose, AiOutlineWarning } from 'react-icons/ai'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useUserStore } from '../store/userStore'
import { IErrorBackend } from '../models/typesBackEndError'

type TLoginModal = {
    showLoginModal: boolean
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({ showLoginModal, setShowLoginModal }: TLoginModal) => {
    const { setUser, setUserToken } = useUserStore((state) => ({
        setUser: state.setUser,
        setUserToken: state.setUserToken,
    }))

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        reset,
    } = useForm<TLoginSchema>({
        mode: 'onBlur',
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (formData: TLoginSchema) => {
        try {
            const { data } = await axios.post(
                'http://localhost:8080/api/users/login',
                {
                    ...formData,
                },
            )
            console.log(data.user._id)
            setUser(data.user)
            setUserToken(data.token)
            reset()
            setShowLoginModal(false)
        } catch (error: unknown) {
            if (error) {
                toast.error((error as IErrorBackend).response.data.message)
            }
        }
    }

    return (
        <>
            {showLoginModal && (
                <div className="fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center">
                    <div className="w-[450px] flex flex-col">
                        <button
                            className="text-white text-xl place-self-end"
                            onClick={() => setShowLoginModal(false)}
                        >
                            <AiOutlineClose className="bg-gray-900" />
                        </button>
                        <div className="bg-gray-800 rounded p-10 bg-opacity-90">
                            <div className="flex justify-center items-center mb-5 text-white">
                                <img
                                    className={`w-[35px] h-[35px]`}
                                    src="https://images.squarespace-cdn.com/content/v1/64b01b7f5312692724db8739/a2c54d31-22bd-492c-8c50-726a20448ff7/ChiAlpha_Icon_White.png"
                                    alt=""
                                />
                                <p className="font-bold">ConnectHub</p>
                            </div>
                            <h5 className="text-xl text-white mb-5 ml-1">
                                Login to your account:
                            </h5>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-y-2"
                            >
                                <input
                                    placeholder="Username"
                                    {...register('username')}
                                    className="px-4 py-2 rounded bg-gray-900 focus:outline-0 text-white bg-opacity-80"
                                />
                                {errors.username ? (
                                    <p className="text-red-500 flex items-center gap-1 justify-center">
                                        <AiOutlineWarning />
                                        {errors.username.message}
                                    </p>
                                ) : (
                                    <p className="h-[24px]"></p>
                                )}

                                <input
                                    placeholder="Password"
                                    {...register('password')}
                                    className="px-4 py-2 rounded bg-gray-900 focus:outline-0 text-white bg-opacity-80"
                                />
                                {errors.password ? (
                                    <p className="text-red-500 flex items-center gap-1 justify-center">
                                        <AiOutlineWarning />
                                        {errors.password.message}
                                    </p>
                                ) : (
                                    <p className="h-[24px]"></p>
                                )}

                                <button
                                    type="submit"
                                    className="text-white p-2 bg-gray-900 rounded font-bold hover:bg-gray-800"
                                    disabled={isSubmitting}
                                >
                                    LOGIN
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LoginModal