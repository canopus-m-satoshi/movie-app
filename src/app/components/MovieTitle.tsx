'use client'

import { getMovieDetails } from '@/api/movie/getMovieDetails/route'

import useSWR from 'swr'
import Loading from '../loading'

type Props = {
  movieId: string
}

const fetcher = async (url: string) => {
  const res = await getMovieDetails(url)
  return res.data
}

export default function MovieTitle({ movieId }: Props) {
  const { data, error } = useSWR(movieId, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return <p>{data.original_title}</p>
}
