'use client'

import TooltipButton from './TooltipButton'
import { FaBookmark, FaHeart, FaList } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/lib/store'
import { addMovieToList } from '@/lib/features/lists/listsSlice'
import { useState } from 'react'

type ListType = 'favorites' | 'watchlist' | 'custom'
type Props = {
  movieId: string
}

const Tooltips = ({ movieId }: Props) => {
  const dispatch: AppDispatch = useDispatch()

  const uid = useSelector((state: RootState) => state.auth.user.uid)

  const usersLists = useSelector(
    (state: RootState) => state.lists.usersLists[uid],
  )

  // The UI state is derived from whether the movieId is in the corresponding list
  const [isFavorite, setIsFavorite] = useState(false)
  const [isWatchlist, setIsWatchlist] = useState(false)
  const [isCustom, setIsCustom] = useState(false)

  // This function dispatches the RTK action and is concerned with the application state
  const onAddLists = async (listType: ListType, movieId: string) => {
    await dispatch(addMovieToList({ listType, movieId, uid }))

    switch (listType) {
      case 'favorites':
        usersLists.favorites.includes(movieId)
          ? setIsFavorite(true)
          : setIsFavorite(false)
        break
      case 'watchlist':
        usersLists.watchlist.includes(movieId)
          ? setIsWatchlist(true)
          : setIsWatchlist(false)
        break
      case 'custom':
        usersLists.custom.includes(movieId)
          ? setIsCustom(true)
          : setIsCustom(false)
        break

      default:
        break
    }
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
