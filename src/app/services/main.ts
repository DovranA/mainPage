import { main } from '../../types'
import { api } from './api'
// export type mainPage = Omit<main, any>
export const mainApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getmainP: builder.query<main, void>({
      query: () => ({
        url: 'videos/mainpage',
        method: 'GET',
      }),
    }),
  }),
})

export const { useLazyGetmainPQuery } = mainApi
export const {
  endpoints: { getmainP },
} = mainApi
