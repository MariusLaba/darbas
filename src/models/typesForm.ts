import { z } from 'zod'

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, 'Username must be at least 3 characters long')
            .max(15, "Username can't be longer than 15 characters"),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    })

export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
})

export const imageChangeSchema = z.object({
    image: z.string().startsWith('http', 'Invalid link'),
})

export const passwordChangeSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const createPostSchema = z.object({
    image: z.string().startsWith('http', 'Invalid link'),
    message: z.string().min(1, 'Text area is empty'),
})

export const commentSchema = z.object({
    comment: z.string().min(1, 'Comment is empty'),
})

export const messageSchema = z.object({
    message: z
        .string()
        .min(1, 'Cannot send empty message')
        .max(1000, 'Message cannot exceed 1000 characters'),
})

export type TRegisterSchema = z.infer<typeof registerSchema>
export type TLoginSchema = z.infer<typeof loginSchema>
export type TImageChangeSchema = z.infer<typeof imageChangeSchema>
export type TPasswordChangeSchema = z.infer<typeof passwordChangeSchema>
export type TCreatePostSchema = z.infer<typeof createPostSchema>
export type TCommentSchema = z.infer<typeof commentSchema>
export type TMessageSchema = z.infer<typeof messageSchema>