'use client'

import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

type Movie = {
  id: string
  title: string
  overview: string
  poster_path: string
  release_date: string
}

export default function Home() {
  const [inputedText, setInputedText] = useState('')
  const [searchField, setSearchField] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])

  const poster_url = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/'

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputedText(e.target.value)
  }

  const handleOnClick = () => {
    searchMovies()
    setSearchField(inputedText)
    setInputedText('')
  }

  const handleOnClear = () => {
    setInputedText('')
  }

  const searchMovies = async () => {
    const apiToken = process.env.NEXT_PUBLIC_TMDB_API_TOKEN
    const baseUrl = `https://api.themoviedb.org/3/search/movie?query=${inputedText}&include_adult=false&language=en-US&page=1`

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
              className="input input-bordered w-64 max-w-xs"
              type="text"
              placeholder="タイトル,ジャンル,気分を入力"
              onChange={(e) => handleOnChange(e)}
              value={inputedText}
            />
          </div>

          <button
            className="btn btn-primary py-1"
            disabled={!inputedText}
            onClick={() => handleOnClick()}>
            検索
          </button>
          <button
            className="btn py-1"
            disabled={!inputedText}
            onClick={() => handleOnClear()}>
            クリア
          </button>
        </div>

        <div className="my-8">
          <p className="">検索キーワード：{searchField}</p>
        </div>

        <div className="grid grid-cols-5 gap-y-10 gap-x-4 ">
          {movies &&
            movies.map((movie) => (
              <div key={movie.id}>
                <div>
                  <Image
                    src={`${poster_url}${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={440}
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
