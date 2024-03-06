import axios from 'axios'
import Image from 'next/image'
import { Movie } from '@/app/types/Movie'
import { posterURL } from '@/constants/posterURL'

type Genres = Pick<Movie, 'genres'>

const fetchMovie = async (id: number) => {
  const apiToken = process.env.NEXT_PUBLIC_TMDB_API_TOKEN
  const baseUrl = `https://api.themoviedb.org/3/movie/${id}?language=ja`

  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
    }

    return await axios.get(baseUrl, options)
  } catch (error) {
    throw new Error('Failed to fetch search results')
  }
}
export default async function MovieDetails({
  params,
}: {
  params: { id: number }
}) {
  const res = await fetchMovie(params.id)
  const movie = res.data

  return (
    <>
      <div className="container mx-auto mt-6">
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          <div className="col-span-1 row-span-3">
            <Image
              src={
                movie.poster_path
                  ? `${posterURL}${movie.poster_path}`
                  : '/dummy-image.png'
              }
              alt={movie.poster_path ? movie.title : 'ダミー画像'}
              width={300}
              height={440}
            />
          </div>
          <div className="col-span-2 row-span-1">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="mt-3">公開日：{movie.release_date}</p>
            <ul className="flex flex-wrap gap-2 mt-3">
              {movie.genres.map((genre: Genres['genres'][number]) => (
                <li
                  key={genre.id}
                  className="border border-slate-400	 rounded-md p-1">
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 row-span-1">
            <p>{movie.overview}</p>
          </div>
          <div className="col-start-3 col-span-1 row-start-3">
            <button className="btn">addFavoritButton</button>
            <button className="btn ml-3">WatchedButton</button>
          </div>
        </div>
      </div>
    </>
  )
}
