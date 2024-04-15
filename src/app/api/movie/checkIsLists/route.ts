import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/lib/firebase/firebase'
import { getCurrentUser } from '@/lib/firebase/firebase-admin'

export const checkIsLists = async (movieId: string) => {
  const currentUser = await getCurrentUser()

  try {
    if (!currentUser) return null

    const userListRef = doc(db, 'users', currentUser?.uid)

    const favoritesRef = doc(userListRef, 'favorites', movieId)
    const favoritesDoc = await getDoc(favoritesRef)

    const watchlistsRef = doc(userListRef, 'watchlists', movieId)
    const watchlistsDoc = await getDoc(watchlistsRef)

    const isLists = {
      favorite: favoritesDoc.exists(),
      watchlist: watchlistsDoc.exists(),
    }

    return await isLists
  } catch (error) {
    throw new Error('Failed to fetch search results')
  }
}
