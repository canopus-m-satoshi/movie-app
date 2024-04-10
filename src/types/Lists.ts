import { Timestamp } from 'firebase/firestore'

export type ListType = 'favorites' | 'watchlist' | 'watched'

export interface Lists {
  [key: string]: string
}

export interface MovieItem {
  [key: string]: any // 任意の文字列をキーとして値を設定
  movieId: string
  addedAt: string
  comment?: string
  watchedAt?: string | null
}
