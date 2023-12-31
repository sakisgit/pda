import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage, persist } from 'zustand/middleware'

type Props = {
  order: any[],
  setOrder: (order: any) => void,
  jwt_token: string | null,
  setJWTToken: (token: string) => void,
  authenticated: boolean,
  setAuthenticated: (bool: boolean) => void,
  refresher: Date | null,
  setRefresher: (date: Date) => void,
}

const useStore = create<Props>()(persist((set, get) => ({
  order: [],
  setOrder: (order) => {
    set({ order: order })
  },
  jwt_token: null,
  setJWTToken: (token) => {
    set({ jwt_token: token })
  },
  authenticated: false,
  setAuthenticated: (bool) => {
    set({ authenticated: bool })
  },
  refresher: null,
  setRefresher: (refresher) => {
    set({ refresher: refresher })
  }
}), {
  name: 'pdaStates',
  partialize: (state) => ({
    jwt_token: state.jwt_token,
    authenticated: state.authenticated
  }),
  storage: createJSONStorage(() => AsyncStorage),
}))

export default useStore