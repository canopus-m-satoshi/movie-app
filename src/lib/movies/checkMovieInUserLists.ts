import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/lib/firebase/firebase'
import { MovieListStatusData } from '@/types/Movie'

/**
 * @param movieId
 * @param userId
 * @returns {Promise<{favorites: boolean, watchlists: boolean}>}
 */

export const checkMovieInUserLists = async (
  movieId: string,
  userId: string,
) => {
  try {
    const userListRef = doc(db, 'users', userId)
    const listTypes = ['favorites', 'watchlists', 'isWatched']

    const docs = await Promise.all(
      listTypes.map(async (type): Promise<[string, boolean]> => {
        if (type === 'isWatched') {
          const ref = await getDoc(doc(userListRef, 'movies', movieId))
          const data = ref.data()
          const isWatched = data?.watchedAt ? true : false

          return [type, isWatched]
        } else {
          const ref = await getDoc(doc(userListRef, type, movieId))

          return [type, ref.exists()]
        }
      }),
    )

    return docs.reduce<MovieListStatusData>(
      (acc, item) => ({ ...acc, [item[0]]: item[1] }),
      {
        favorites: false,
        watchlists: false,
        isWatched: false,
      },
    )
  } catch (error: any) {
    console.error('Failed to check Lists status', error)
    throw new Error('Some error occurred', { cause: error })
  }
}
