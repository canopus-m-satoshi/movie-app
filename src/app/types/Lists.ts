export type ListType = 'favorites' | 'watchlist' | 'custom'

export interface Lists {
  custom: MovieItem[]
  favorites: MovieItem[]
  watchlist: MovieItem[]
}

export interface MovieItem {
  movieId: string
  addedAt: string
  comment?: string
}
