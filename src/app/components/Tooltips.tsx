'use client'

import TooltipButton from './TooltipButton'
import { FaBookmark, FaHeart, FaList } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/lib/store'
import { addMovieToList } from '@/lib/features/lists/listsSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { toastConfig } from '@/lib/toastConfig'
import Loading from './Loading'

type ListType = 'favorites' | 'watchlist' | 'custom'
type Props = {
  movieId: string
}

const Tooltips = ({ movieId }: Props) => {
  const dispatch: AppDispatch = useDispatch()

  const uid = useSelector((state: RootState) => state.auth.user?.uid)

  const usersLists = useSelector(
    (state: RootState) => state.lists.usersLists[uid],
  )

  const [isFavorite, setIsFavorite] = useState(
    usersLists?.favorites?.includes(movieId),
  )
  const [isWatchlist, setIsWatchlist] = useState(
    usersLists?.watchlist?.includes(movieId),
  )
  const [isCustom, setIsCustom] = useState(
    usersLists?.custom?.includes(movieId),
  )

  // This function dispatches the RTK action and is concerned with the application state
  const onAddLists = async (listType: ListType, movieId: string) => {
    await dispatch(addMovieToList({ listType, movieId, uid }))

    switch (listType) {
      case 'favorites':
        usersLists.favorites.includes(movieId)
          ? setIsFavorite(true)
          : setIsFavorite(false)

        toast.success('お気に入りリストに追加しました', toastConfig)
        break
      case 'watchlist':
        usersLists.watchlist.includes(movieId)
          ? setIsWatchlist(true)
          : setIsWatchlist(false)

        toast.success('ウォッチリストに追加しました', toastConfig)
        break
      case 'custom':
        usersLists.custom.includes(movieId)
          ? setIsCustom(true)
          : setIsCustom(false)

        toast.success('リストに追加しました', toastConfig)
        break

      default:
        break
    }
  }

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <Loading />
  }

  return (
    <div className="md:col-span-2 md:row-span-1 flex gap-4 ml-0 mr-auto w-fit">
      <TooltipButton
        icon={isFavorite ? <FaHeart color={'#ff002d'} /> : <FaHeart />}
        tip="お気に入りに追加する"
        onClick={() => onAddLists('favorites', movieId)}
      />
      <TooltipButton
        icon={isWatchlist ? <FaBookmark color={'#ffe200'} /> : <FaBookmark />}
        tip="ウォッチリストに追加する"
        onClick={() => onAddLists('watchlist', movieId)}
      />
      <TooltipButton
        icon={isCustom ? <FaList color={'#04b600'} /> : <FaList />}
        tip="リストに追加する"
        onClick={() => onAddLists('custom', movieId)}
      />
    </div>
  )
}
export default Tooltips
