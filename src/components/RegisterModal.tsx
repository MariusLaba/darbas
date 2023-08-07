import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiOutlineClose, AiOutlineWarning } from 'react-icons/ai'
import { registerSchema, TRegisterSchema } from '../models/typesForm'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { IErrorBackend } from '../models/typesBackEndError'

type TRegisterModal = {
    showRegisterModal: boolean
    setShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterModal = ({
                           showRegisterModal,
                           setShowRegisterModal,
                       }: TRegisterModal) => {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        reset,
    } = useForm<TRegisterSchema>({
        mode: 'onBlur',
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (formData: TRegisterSchema) => {
        try {
            const { data } = await axios.post(
                'http://localhost:8080/api/users/register',
                {
                    ...formData,
                },
            )
            reset()
            toast.success(data.message)
            setShowRegisterModal(false)
        } catch (error) {
            if (error) toast.error((error as IErrorBackend).response.data.message)
        }
    }

    return (
        <>
            {showRegisterModal && (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-[450px] flex flex-col">
                        <button
                            className="text-white text-xl place-self-end"
                            onClick={() => setShowRegisterModal(false)}
                        >
                            <AiOutlineClose className="bg-gray-900" />
                        </button>
                        <div className="bg-gray-800 rounded p-10 bg-opacity-90">
                            <div className="flex justify-center items-center mb-5 text-white">
                                {' '}
                                <img
                                    className={`w-[35px] h-[35px]`}
                                    src="https://images.squarespace-cdn.com/content/v1/64b01b7f5312692724db8739/a2c54d31-22bd-492c-8c50-726a20448ff7/ChiAlpha_Icon_White.png"
                                    alt=""
                                />
                                <p className="font-bold">ConnectHub</p>
                            </div>
                            <h5 className="text-xl text-white mb-5 ml-1">
                                Create your account:
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

                                <input
                                    placeholder="Confirm Password"
                                    {...register('confirmPassword')}
                                    className="px-4 py-2 rounded bg-gray-900 focus:outline-0 text-white bg-opacity-80"
                                />
                                {errors.confirmPassword ? (
                                    <p className="text-red-500 flex items-center gap-1 justify-center">
                                        <AiOutlineWarning />
                                        {errors.confirmPassword.message}
                                    </p>
                                ) : (
                                    <p className="h-[24px]"></p>
                                )}

                                <button
                                    type="submit"
                                    className="text-white p-2 bg-gray-900 rounded font-bold hover:bg-gray-800"
                                    disabled={isSubmitting}
                                >
                                    REGISTER
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RegisterModal