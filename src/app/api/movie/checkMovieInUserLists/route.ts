import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/lib/firebase/firebase'
import { getCurrentUser } from '@/lib/firebase/firebase-admin'

export const checkMovieInUserLists = async (movieId: string) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  try {
    const userListRef = doc(db, 'users', currentUser.uid)

    const favoritesRef = doc(userListRef, 'favorites', movieId)
    const favoritesDoc = await getDoc(favoritesRef)

    const watchlistsRef = doc(userListRef, 'watchlists', movieId)
    const watchlistsDoc = await getDoc(watchlistsRef)

    const movieListStatus = {
      favorite: favoritesDoc.exists(),
      watchlist: watchlistsDoc.exists(),
    }

    return await movieListStatus
  } catch (error: any) {
    console.error('Failed to check Lists status', error)
    throw new Error('Failed to check Lists status', { cause: error })
  }
}
