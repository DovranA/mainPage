import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
// import { RootState } from '../store'
const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
})
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 })
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
})
