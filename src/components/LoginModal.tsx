import React from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema, TLoginSchema } from '../models/typesForm'
import { AiOutlineClose, AiOutlineWarning } from 'react-icons/ai'
import axios from 'axios'

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

        }
    }

    return (
        <>
            {showLoginModal && (
                <div className=" d-flex jc-center ">
                    <div className="w-800 d-flex flex-col">
                        <button
                            className="text-white text-xl place-self-end"
                            onClick={() => setShowLoginModal(false)}
                        >
                            <AiOutlineClose className="colorGrey" />
                        </button>
                        <div className="colorWhite p100">


                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col"
                            >
                                <input
                                    placeholder="Username"
                                    {...register('username')}
                                    className="p20 lightGray"
                                />
                                {errors.username ? (
                                    <p className="textRed d-flex j-center">
                                        <AiOutlineWarning />
                                        {errors.username.message}
                                    </p>
                                ) : (
                                    <p className="h-[24px]"></p>
                                )}

                                <input
                                    placeholder="Password"
                                    {...register('password')}
                                    className="p20 lightGray"
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
                                    className="whiteText  colorBlack p20"
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