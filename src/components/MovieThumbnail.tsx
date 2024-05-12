import Image from 'next/image'
import useSWR from 'swr'

import { posterURL } from '@/constants/posterURL'
import { getMovieDetails } from '@/lib/movies/getMovieDetails'

import Loading from './Loading'

type Props = {
  movieId: string
}

const fetcher = async (url: string) => {
  const res = await getMovieDetails(url)
  return res.data
}

const MovieThumbnail = ({ movieId }: Props) => {
  const { data, error } = useSWR(movieId, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Image
      src={
        data.poster_path
          ? `${posterURL}${data.poster_path}`
          : '/dummy-image.png'
      }
      alt={data.poster_path ? data.title : 'ダミー画像'}
      width={150}
      height={225}
      sizes="(max-width: 450px) 80px,(max-width: 768px) 130px, (max-width: 1024px) 150px, 225px"
    />
  )
}
export default MovieThumbnail
