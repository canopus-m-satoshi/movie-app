import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/lib/firebase'

export const getUid = async (): Promise<string | null> => {
  const auth = getAuth()
  const user = auth.currentUser
  if (user) {
    return user.uid
  } else {
    return null
  }
}

export const checkIsLists = async (movieId: string, uid: string) => {
  try {
    const userListRef = doc(db, 'users', uid)

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
