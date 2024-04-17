import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/lib/firebase/firebase'
import { getCurrentUser } from '@/lib/firebase/firebase-admin'

export const checkMovieInUserLists = async (movieId: string) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  try {
    const userListRef = doc(db, 'users', currentUser.uid)
    const listTypes = ['favorites', 'watchlists']

    const docs = await Promise.all(
      listTypes.map(async (type): Promise<[string, boolean]> => {
        const ref = await getDoc(doc(userListRef, type, movieId))

        return [type, ref.exists()]
      }),
    )

    // 算出プロパティ名（Computed property names）: []でくくることで、式の値から動的にプロパティ名を生成することができる
    return docs.reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {})
  } catch (error: any) {
    console.error('Failed to check Lists status', error)
    throw new Error('Failed to check Lists status', { cause: error })
  }
}
