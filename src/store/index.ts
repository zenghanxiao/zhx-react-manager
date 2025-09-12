import { create } from 'zustand'
import type { User } from '@/types/api'
import storage from '@/utils/storage'

export const useStore = create<{
  token: string
  userInfo: User.UserItem
  collapsed: boolean
  isDark: boolean
  updateToken: (token: string) => void
  updateUserInfo: (userInfo: User.UserItem) => void
  updateCollapsed: () => void
  updateTheme: (isDark: boolean) => void
}>(set => ({
  token: '123123',
  userInfo: {
    _id: '123',
    userId: 0,
    userName: 'zenghanxiao',
    userEmail: 'zengxiao@qq.com',
    deptId: '123',
    state: 0,
    mobile: '15988107436',
    job: '',
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg: ''
  },
  collapsed: false,
  isDark: storage.get('isDark') || false,
  updateToken: token => set({ token }),
  updateTheme: isDark => set({ isDark }),
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  updateCollapsed: () =>
    set(state => {
      return {
        collapsed: !state.collapsed
      }
    })
}))
