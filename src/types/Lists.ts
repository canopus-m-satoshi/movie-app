import { Timestamp } from 'firebase/firestore'

export type ListType = 'favorites' | 'watchlist' | 'custom' | 'watched'

export interface Lists {
  custom: MovieItem[]
  favorites: MovieItem[]
  watchlist: MovieItem[]
}

export interface MovieItem {
  [key: string]: any // 任意の文字列をキーとして値を設定
  movieId: string
  addedAt: string
  comment?: string
  watchedAt?: Timestamp | null
}
