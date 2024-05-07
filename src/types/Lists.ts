import { MovieItem } from './Movie'

export type Lists = {
  movieListData: Record<string, MovieItem>
  favorites: Record<string, MovieItem>
  watchlists: Record<string, MovieItem>
}
