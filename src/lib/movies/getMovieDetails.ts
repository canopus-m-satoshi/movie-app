import axios from 'axios'

/**
 * 映画詳細情報を返す関数
 * @param movieId : TMDBに登録された映画のID
 *
 * @returns : 映画詳細情報データを持ったレスポンス
 */

export const getMovieDetails = async (id: number | string) => {
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
