'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import Loading from '../components/Loading'
import Link from 'next/link'
import { Movie } from '../types/Movie'
import { posterURL } from '@/constants/posterURL'
import { useCustomFetch } from '@/hooks/useMovieFetch'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query: string | null = searchParams.get('query')
  const page: string | null = searchParams.get('page')

  const [inputedText, setInputedText] = useState(query || '')
  const [isShowLoadButton, setIsShowLoadButton] = useState(false)
  const [currentPage, setCurrentPage] = useState(page || '1')
  const [isShowData, setIsShowData] = useState(false)

  const baseUrl = `https://api.themoviedb.org/3/search/movie?query=${inputedText}&include_adult=false&language=ja&page=${currentPage}`

  const { data, isLoading } = useCustomFetch(baseUrl)

  const movies = data?.results || null
  const totalPages = data?.total_pages || 0

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputedText(e.target.value)
  }

  const searchMoviesOnClick = () => {
    setIsShowData(true)
    setCurrentPage('1')
    router.push(`/movie?query=${inputedText}&page=1`)
  }

  const handleClear = () => {
    setInputedText('')

    setIsShowData(false)
    router.push('/movie')
  }

  const loadMoreMovies = () => {
    setCurrentPage((prevPage) => prevPage + 1)
    router.push(`/movie?query=${inputedText}&page=${currentPage + 1}`)
  }

  useEffect(() => {
    if (totalPages > 1) {
      setIsShowLoadButton(true)
    } else {
      setIsShowLoadButton(false)
    }

    currentPage > totalPages && setIsShowLoadButton(false)
  }, [totalPages, currentPage])

  useEffect(() => {
    if (query) {
      setIsShowData(true)
    }
  }, [query])

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
            disabled={inputedText === ''}
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

        {query && (
          <div className="my-4 md:my-8">
            <p className="">検索キーワード：{query}</p>
          </div>
        )}

        {isShowData && isLoading ? (
          <Loading />
        ) : (
          <div>
            {isShowData && movies && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
                  {movies.map((movie) => (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}?query=${query}&page=${page}`}>
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
