'use client'

import TooltipButton from './TooltipButton'
import { FaBookmark, FaHeart, FaList } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import {
  fetchUserLists,
  toggleMovieInList,
} from '@/lib/features/lists/listsSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { toastConfig } from '@/lib/toastConfig'

import { ListType, MovieItem } from '../types/Lists'

type Props = {
  movieId: string
}

const Tooltips = ({ movieId }: Props) => {
  const dispatch: AppDispatch = useDispatch()

  const uid = useSelector((state: RootState) => state.auth.user?.uid)
  const movieListData: MovieItem | undefined = useSelector(
    (state: RootState) => state.lists.movieListData[uid],
  )

  const [isFavorite, setIsFavorite] = useState(false)
  const [isWatchlist, setIsWatchlist] = useState(false)
  const [isCustom, setIsCustom] = useState(false)

  const [favoriteTip, setFavoriteTip] = useState('')
  const [watchTip, setWatchTip] = useState('')
  const [customTip, setCustomTip] = useState('')

  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage, toastConfig)
      setToastMessage('')
    }
  }, [toastMessage])

  // useEffectを使用してツールチップのテキストを更新
  useEffect(() => {
    setFavoriteTip(
      isFavorite ? 'お気に入りから削除する' : 'お気に入りに追加する',
    )
    setWatchTip(
      isWatchlist ? 'ウォッチリストから削除する' : 'ウォッチリストに追加する',
    )
    setCustomTip(
      isCustom ? 'カスタムリストから削除する' : 'カスタムリストに追加する',
    )
  }, [isFavorite, isWatchlist, isCustom])

  useEffect(() => {
    if (uid) {
      dispatch(fetchUserLists(uid))
    }
  }, [uid, dispatch])

  useEffect(() => {
    if (uid && movieListData) {
      setIsFavorite(movieListData[movieId]?.isFavorite)
      setIsWatchlist(movieListData[movieId]?.isWatchlist)
      setIsCustom(movieListData[movieId]?.isCustom)
    }
  }, [movieListData, movieId])

  const onToggleLists = async (listType: ListType) => {
    await dispatch(toggleMovieInList({ listType, movieId, uid }))

    let message = ''
    switch (listType) {
      case 'favorites':
        setIsFavorite(!isFavorite)
        message = isFavorite
          ? 'お気に入りリストから削除しました'
          : 'お気に入りリストに追加しました'

        break
      case 'watchlist':
        setIsWatchlist(!isWatchlist)
        message = isWatchlist
          ? 'ウォッチリストから削除しました'
          : 'ウォッチリストに追加しました'

        break
      case 'custom':
        setIsCustom(!isCustom)
        message = isCustom
          ? 'カスタムリストから削除しました'
          : 'カスタムリストに追加しました'

        break
    }

    setToastMessage(message)
  }

  return (
    <div className="md:col-span-2 md:row-span-1 flex gap-4 ml-0 mr-auto w-fit">
      <TooltipButton
        icon={isFavorite ? <FaHeart color={'#ff002d'} /> : <FaHeart />}
        tip={favoriteTip}
        onClick={() => onToggleLists('favorites')}
      />
      <TooltipButton
        icon={isWatchlist ? <FaBookmark color={'#ffe200'} /> : <FaBookmark />}
        tip={watchTip}
        onClick={() => onToggleLists('watchlist')}
      />
      <TooltipButton
        icon={isCustom ? <FaList color={'#04b600'} /> : <FaList />}
        tip={customTip}
        onClick={() => onToggleLists('custom')}
      />
    </div>
  )
}

export default Tooltips
