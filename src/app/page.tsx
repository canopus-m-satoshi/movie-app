'use client'

import axios from 'axios'
import { useState } from 'react'

type Movie = {
  id: string
  title: string
  overview: string
  poster_path: string
  release_date: string
}

export default function Home() {
  const [searchField, setSearchField] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])

  const poster_url = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/'

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value)

    console.log(searchField)
  }

  const handleOnClick = () => {
    searchMovies()
  }

  const searchMovies = async () => {
    const apiToken = process.env.NEXT_PUBLIC_TMDB_API_TOKEN
    const baseUrl =
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en&page=1&sort_by=popularity.desc'

    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
      }
      const response = await axios.get(baseUrl, options)
      return setMovies(response.data.results)
    } catch {
      throw new Error('Failed to fetch search results')
    }
  }

  return (
    <main className="mt-5">
      <div className="container mx-auto py-8">
        <h2 className="text-center font-bold text-4xl">映画を検索</h2>
        <div className="flex justify-center gap-2 mt-5 w-fit mx-auto">
          <div className="flex-grow">
            <input
              className="w-64 border px-2 py-1"
              type="text"
              placeholder="タイトル,ジャンル,気分を入力"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <button className=" border py-1 px-4" onClick={() => handleOnClick()}>
            検索
          </button>
        </div>

        <div className="grid grid-cols-5 gap-y-10 gap-x-4">
          {movies &&
            movies.map((movie) => (
              <div key={movie.id}>
                <div>
                  <img
                    src={`${poster_url}${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <h3 className="font-bold text-2xl mt-3">{movie.title}</h3>
                <p>公開日:{movie.release_date}</p>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}
