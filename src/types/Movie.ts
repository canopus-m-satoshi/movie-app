import { Timestamp } from 'firebase/firestore'

export interface MovieItem {
  [key: string]: any // 任意の文字列をキーとして値を設定
  movieId: string
  addedAt: string
  comment?: string
  watchedAt?: string | Date | null
}

export type MovieListStatusData = {
  favorites: boolean
  watchlists: boolean
  isWatched: boolean
}

export type Movie = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget: number
  genres: Array<{
    id: number
    name: string
  }>
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Array<{
    id: number
    logo_path: string
    name: string
    origin_country: string
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Array<{
    english_name: string
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
