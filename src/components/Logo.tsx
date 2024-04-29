'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const Logo = () => {
  const searchParams = useSearchParams()
  const query: string | null = searchParams.get('query')
  const page: number | null = parseInt(searchParams.get('page') || '1')

  let headerLink = '/movie'
  if (query) {
    headerLink = `/movie?query=${query}&page=${page}`
  }

  return (
    <h1 className="font-bold text-3xl min-[450px]:text-4xl">
      <Link href={headerLink}>MOVIE APP</Link>
    </h1>
  )
}
export default Logo
