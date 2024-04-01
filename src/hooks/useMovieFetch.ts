import axios from 'axios'
import useSWR from 'swr'

type FetchFunc = (url: string, token: string) => Promise<any>

const apiToken = process.env.NEXT_PUBLIC_TMDB_API_TOKEN

const fetchWithToken: FetchFunc = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const useCustomFetch = (url: string) => {
  if (!apiToken) {
    throw new Error('APIトークンが設定されていません。')
  }

  const { data, error } = useSWR([url, apiToken], ([url, token]) =>
    fetchWithToken(url, token),
  )
  return { data, error }
}

export { fetchWithToken, useCustomFetch }