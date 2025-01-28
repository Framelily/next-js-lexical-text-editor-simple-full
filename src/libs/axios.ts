import Axios, { isAxiosError } from 'axios'
import type { AxiosError } from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const axios = Axios.create({
  baseURL: publicRuntimeConfig.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
})

let accessToken: string | null = null
let refreshToken: string | null = null

const isMyCustomError = (payload: unknown): payload is AxiosError<unknown, unknown> => {
  return isAxiosError(payload)
}

const setAccessToken = (token: string | null) => {
  if (token) {
    accessToken = token
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`
  }
}

const setRefreshToken = (token: string | null) => {
  if (token) refreshToken = token
}

const getAccessToken = () => accessToken
const getRefreshToken = () => refreshToken

export { axios, setAccessToken, isMyCustomError, getAccessToken, setRefreshToken, getRefreshToken }
