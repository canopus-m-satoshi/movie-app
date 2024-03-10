'use client'

import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import Loading from '../components/Loading'
import Link from 'next/link'
import { Movie } from '../types/Movie'
import { posterURL } from '@/constants/posterURL'

export default function Home() {
  const [inputedText, setInputedText] = useState('')
  const [searchField, setSearchField] = useState('')
  const [isShowLoadButton, setIsShowLoadButton] = useState(false)
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const isSearched = totalPages > 0

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputedText(e.target.value)
  }

  const searchMoviesOnClick = () => {
    searchMovies()
    setSearchField(inputedText)
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handleClear = () => {
    setInputedText('')
    setIsShowLoadButton(false)
    setMovies([])
    setCurrentPage(1)
    setTotalPages(0)
  }

  const loadMoreMovies = () => {
    setCurrentPage((prevPage) => prevPage + 1)
    searchMovies()
  }

  const searchMovies = async () => {
    setIsLoading(true)

    try {
      const apiToken = process.env.NEXT_PUBLIC_TMDB_API_TOKEN
      const baseUrl = `https://api.themoviedb.org/3/search/movie?query=${inputedText}&include_adult=false&language=ja&page=${currentPage}`
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
      }
      const response = await axios.get(baseUrl, options)

      setMovies((prevMovies) => [...prevMovies, ...response.data.results])
      setTotalPages(response.data.total_pages)

      setIsLoading(false)
    } catch {
      throw new Error('Failed to fetch search results')
    }
  }

  useEffect(() => {
    if (totalPages > 1) {
      setIsShowLoadButton(true)
    } else {
      setIsShowLoadButton(false)
    }

    currentPage > totalPages && setIsShowLoadButton(false)
  }, [totalPages, currentPage])

  return (
    <main className="mt-5">
      <div className="container mx-auto py-8 px-3 md:px-0">
        <h2 className="text-center font-bold  text-xl md:text-4xl">
          映画を検索 名探偵コナン
        </h2>
        <div className="flex justify-center flex-wrap gap-2 mt-5 w-fit mx-auto">
          <div className="flex-grow">
            <input
              className="input input-bordered w-full md:w-64"
              type="text"
              placeholder="タイトル,ジャンル,気分を入力"
              onChange={(e) => handleInputChange(e)}
              value={inputedText}
            />
          </div>

          <button
            className="btn btn-primary whitespace-nowrap	 py-1 basis-[48%] md:basis-[15%]"
            disabled={totalPages > 0}
            onClick={() => searchMoviesOnClick()}>
            検索
          </button>
          <button
            className="btn py-1 whitespace-nowrap basis-[48%] md:basis-[15%]"
            disabled={!movies}
            onClick={() => handleClear()}>
            クリア
          </button>
        </div>

        {isSearched && (
          <div className="my-4 md:my-8">
            <p className="">検索キーワード：{searchField}</p>
          </div>
        )}

        {isLoading && currentPage === 0 ? (
          <Loading />
        ) : (
          <div>
            {movies && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
                  {movies.map((movie) => (
                    <Link key={movie.id} href={`/movie/${movie.id}`}>
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
                      <h3 className="font-bold text-lg lg:text-2xl mt-3">
                        {movie.title}
                      </h3>
                      <p>
                        公開日:
                        {movie.release_date ? movie.release_date : ' 不明'}
                      </p>
                    </Link>
                  ))}
                </div>

                {isShowLoadButton && (
                  <button
                    className="btn btn-primary block w-fit mx-auto mt-6"
                    onClick={loadMoreMovies}>
                    さらに読み込む
                    {isLoading && (
                      <span className="loading loading-spinner"></span>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
