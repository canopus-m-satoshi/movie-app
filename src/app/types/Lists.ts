export type ListType = 'favorites' | 'watchlist' | 'custom'

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
  favoriteAddedAt: string
  isFavorite?: boolean
  isWatchlist?: boolean
  watchedAt?: string
  watchlistAddedAt?: string
}
