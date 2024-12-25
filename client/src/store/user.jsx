import { create } from "zustand";
import { persist } from 'zustand/middleware';

const useUserStore = create(persist(
    (set) => 
        ({
            user: null,
            addUser: (userData) => set({ user: userData }),
            removeUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage',
            getStorage: () => sessionStorage,
        }
));

export default useUserStore;