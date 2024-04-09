'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useCustomFetch } from '@/hooks/useMovieFetch'

import Loading from '../../components/Loading'
import MovieList from '../../components/MovieList'
import Pagination from '../../components/Pagination'
import { Movie } from '../../types/Movie'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query: string | null = searchParams.get('query')
  const page: number | null = parseInt(searchParams.get('page') || '1')

  const [inputedText, setInputedText] = useState(query || '')
  const [currentPage, setCurrentPage] = useState<number>(page || 1)
  const [isShowData, setIsShowData] = useState(false)

  const baseUrl = `https://api.themoviedb.org/3/search/movie?query=${inputedText}&include_adult=false&language=ja&page=${currentPage}`

  const { data, isLoading } = useCustomFetch(baseUrl)

  const movies: Movie[] = data?.results || null
  const totalPages = data?.total_pages || 0

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputedText(e.target.value)
  }

  const searchMoviesOnClick = () => {
    setIsShowData(true)
    setCurrentPage(1)
    router.push(`/movie?query=${inputedText}&page=1`)
  }

  const handleClear = () => {
    setInputedText('')

    setIsShowData(false)
    router.push('/movie')
  }

  const handleSearchPageChange = (index: number) => {
    setCurrentPage(index + 1)
    router.push(`/movie?query=${inputedText}&page=${index + 1}`)
  }

  useEffect(() => {
    if (query) {
      setIsShowData(true)
    }
  }, [query])

  return (
    <main className="mt-5">
      <div className="container mx-auto py-8 px-3 md:px-0">
        <h2 className="text-center font-bold  text-xl md:text-4xl">
          映画を検索
        </h2>
        <div className="flex justify-center flex-wrap gap-2 mt-5 w-fit mx-auto">
          <div className="flex-grow">
            <input
              className="input input-bordered w-full md:w-64"
              type="text"
              placeholder="タイトルを入力"
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
                <MovieList movies={movies} query={query} page={page} />

                {totalPages && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handleSearchPageChange}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
