'use client'

import TooltipButton from './TooltipButton'
import { FaBookmark, FaHeart, FaList } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { toggleMovieInList } from '@/lib/features/lists/listsSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { toastConfig } from '@/lib/toastConfig'
import Loading from './Loading'

type ListType = 'favorites' | 'watchlist' | 'custom'
type Props = {
  movieId: string
}

const Tooltips = ({ movieId }: Props) => {
  const [hasMounted, setHasMounted] = useState(false)
  const dispatch: AppDispatch = useDispatch()

  const uid = useSelector((state: RootState) => state.auth.user?.uid)
  const usersLists = useSelector(
    (state: RootState) =>
      state.lists.usersLists[uid] || {
        favorites: [],
        watchlist: [],
        custom: [],
      },
  )

  const [isFavorite, setIsFavorite] = useState(false)
  const [isWatchlist, setIsWatchlist] = useState(false)
  const [isCustom, setIsCustom] = useState(false)

  const [favoriteTip, setFavoriteTip] = useState(
    isFavorite ? 'お気に入りに追加する' : 'お気に入りに削除する',
  )
  const [watchTip, setWatchTip] = useState(
    isWatchlist ? 'ウォッチリストに追加する' : 'ウォッチリストに削除する',
  )
  const [customTip, setCustomTip] = useState(
    isCustom ? 'カスタムリストに追加する' : 'カスタムリストに削除する',
  )

  // リスト更新後のトースト通知用の状態
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    setIsFavorite(usersLists.favorites.includes(movieId))
    setIsWatchlist(usersLists.watchlist.includes(movieId))
    setIsCustom(usersLists.custom.includes(movieId))
  }, [usersLists, movieId])

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage, toastConfig)
      setToastMessage('') // トースト表示後はメッセージをクリア
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
    setHasMounted(true)
  }, [])

  const onToggleLists = async (listType: ListType) => {
    await dispatch(toggleMovieInList({ listType, movieId, uid }))

    let message = ''
    switch (listType) {
      case 'favorites':
        message = isFavorite
          ? 'お気に入りリストから削除しました'
          : 'お気に入りリストに追加しました'

        setFavoriteTip(
          isFavorite ? 'お気に入りに追加する' : 'お気に入りに削除する',
        )
        break
      case 'watchlist':
        message = isWatchlist
          ? 'ウォッチリストから削除しました'
          : 'ウォッチリストに追加しました'

        setWatchTip(
          isWatchlist ? 'ウォッチリストに追加する' : 'ウォッチリストに削除する',
        )
        break
      case 'custom':
        message = 'カスタムリストに追加しました'

        message = isCustom
          ? 'カスタムリストから削除しました'
          : 'カスタムリストに追加しました'

        setCustomTip(
          isCustom ? 'カスタムリストに追加する' : 'カスタムリストに削除する',
        )
        break
    }

    setToastMessage(message) // トーストメッセージを設定
  }

  if (!hasMounted || !uid) {
    return <Loading />
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
