import { AiOutlineClose, AiOutlineWarning } from 'react-icons/ai'
import React from 'react'
import { useUserStore } from '../store/userStore'
import { useForm } from 'react-hook-form'
import {
    imageChangeSchema,
    passwordChangeSchema,
    TImageChangeSchema,
    TPasswordChangeSchema,
} from '../models/typesForm'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'react-toastify'
import { IErrorBackend } from '../models/typesBackEndError'

type TEditProfileModalProps = {
    showEditProfileModal: boolean
    setShowEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>
}
const EditProfileModal = ({
                              showEditProfileModal,
                              setShowEditProfileModal,
                          }: TEditProfileModalProps) => {
    const { user, setUser, userToken } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
        userToken: state.userToken,
    }))

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        reset,
    } = useForm<TImageChangeSchema>({
        mode: 'onBlur',
        resolver: zodResolver(imageChangeSchema),
    })

    const {
        register: registerPassword,
        formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword },
        handleSubmit: handleSubmitPassword,
        reset: resetPassword,
    } = useForm<TPasswordChangeSchema>({
        mode: 'onBlur',
        resolver: zodResolver(passwordChangeSchema),
    })

    const onImageChange = async (imageData: TImageChangeSchema) => {
        try {
            const { data } = await axios.post(
                'http://localhost:8080/api/users/change/image',
                {
                    ...imageData,
                },
                { headers: { Authorization: `${userToken}` } },
            )
            setUser(data)
            toast.success('Image changed successfully')
            reset()
            setShowEditProfileModal(false)
        } catch (error: unknown) {
            if (error) {
                toast.error((error as IErrorBackend).response.data.message)
            }
        }
    }

    const onPasswordChange = async (passwordData: TPasswordChangeSchema) => {
        try {
            const { data } = await axios.post(
                'http://localhost:8080/api/users/change/password',
                {
                    ...passwordData,
                },
                { headers: { Authorization: `${userToken}` } },
            )
            toast.success(data.message)
            resetPassword()
            setShowEditProfileModal(false)
        } catch (error: unknown) {
            if (error) {
                toast.error((error as IErrorBackend).response.data.message)
            }
        }
    }

    return (
        <>
            {showEditProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-[450px] flex flex-col">
                        <button
                            className="text-white text-xl place-self-end"
                            onClick={() => setShowEditProfileModal(false)}
                        >
                            <AiOutlineClose className="bg-gray-900 hover:bg-gray-800 w-[24px] h-[24px] rounded" />
                        </button>
                        <div className="bg-gray-800 rounded p-10 bg-opacity-90">
                            <div className="flex justify-center items-center mb-5 text-white">
                                <img
                                    className="w-[35px] h-[35px]"
                                    src="https://images.squarespace-cdn.com/content/v1/64b01b7f5312692724db8739/a2c54d31-22bd-492c-8c50-726a20448ff7/ChiAlpha_Icon_White.png"
                                    alt=""
                                />

                            </div>
                            <h5 className="text-xl text-white mb-5 ml-1 text-center">
                                Edit your profile:
                            </h5>
                            <div className="flex flex-col gap-2 items-center">
                                <img
                                    className="w-[150px] h-[150px] rounded-full"
                                    src={user?.image}
                                    alt=""
                                />
                                <form
                                    className="w-full text-center"
                                    onSubmit={handleSubmit(onImageChange)}
                                >
                                    <input
                                        placeholder="New image link"
                                        {...register('image')}
                                        className="px-4 py-2 rounded bg-gray-900 focus:outline-0 text-white bg-opacity-80 text-sm"
                                    />
                                    {errors.image ? (
                                        <p className="text-red-500 flex items-center gap-1 justify-center text-sm">
                                            <AiOutlineWarning />
                                            {errors.image.message}
                                        </p>
                                    ) : (
                                        <p className="h-[20px]"></p>
                                    )}

                                    <button
                                        type="submit"
                                        className="text-white p-2 bg-gray-900 rounded text-sm hover:bg-gray-700"
                                        disabled={isSubmitting}
                                    >
                                        Change image
                                    </button>
                                </form>
                            </div>
                            <div className="flex flex-col gap-2 items-center border-t-2 border-gray-700 mt-5">
                                <form
                                    onSubmit={handleSubmitPassword(onPasswordChange)}
                                    className="w-full text-center"
                                >
                                    <input
                                        placeholder="New password"
                                        {...registerPassword('password')}
                                        className="px-4 py-2 rounded bg-gray-900 focus:outline-0 text-white bg-opacity-80 text-sm mt-10"
                                    />
                                    {errorsPassword.password ? (
                                        <p className="text-red-500 flex items-center gap-1 justify-center text-sm">
                                            <AiOutlineWarning />
                                            {errorsPassword.password.message}
                                        </p>
                                    ) : (
                                        <p className="h-[20px]"></p>
                                    )}

                                    <button
                                        type="submit"
                                        className="text-white p-2 bg-gray-900 rounded text-sm hover:bg-gray-700"
                                        disabled={isSubmittingPassword}
                                    >
                                        Change password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditProfileModal