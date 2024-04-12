import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/lib/firebase'

export const checkIsWatchlist = async (movieId: string, uid: string) => {
  try {
    const userListRef = doc(db, 'users', uid)
    const watchlistsRef = doc(userListRef, 'watchlists', movieId)
    const watchlistsDoc = await getDoc(watchlistsRef)

    return await watchlistsDoc.exists()
  } catch (error) {
    throw new Error('Failed to fetch search results')
  }
}
