'use client'

import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'
import useSWR from 'swr'

import { getMovieDetails } from '@/lib/movies/getMovieDetails'

import Loading from '../app/loading'

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

  return (
    <Link
      href={`/movie/${movieId}`}
      className="link link-hover flex items-center gap-2 pr-4">
      <h3 className="text-2xl font-bold">{data.original_title}</h3>
      <FaChevronRight size={'18px'} />
    </Link>
  )
}
