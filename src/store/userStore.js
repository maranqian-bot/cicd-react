import { create } from 'zustand'

const useUserStore = create((set) => ({
    currentUser: null,
    setCurrentUser: (userData) =>  set({currentUser: userData }),
    logout: () => set({currentUser: null})
}))

export default useUserStore;