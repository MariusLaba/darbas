import { create } from 'zustand'
import { TUserStore } from '../models/typesUserStore'

export const useUserStore = create<TUserStore>((set) => ({
    user: null,
    userToken: null,
    setUser: (data) => set({ user: data }),
    setUserToken: (data) => set({ userToken: data }),
}))