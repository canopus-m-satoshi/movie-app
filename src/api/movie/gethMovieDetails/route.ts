import axios from 'axios'

export const getMovieDetails = async (id: number) => {
  const apiToken = process.env.NEXT_PUBLIC_TMDB_API_TOKEN
  const baseUrl = `https://api.themoviedb.org/3/movie/${id}?language=ja`

  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
    }

    return await axios.get(baseUrl, options)
  } catch (error) {
    throw new Error('Failed to fetch search results')
  }
}
