'use client'

import React, { useEffect, useState } from 'react'
import { FaBookmark, FaEye, FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { toggle as handleModal } from '@/lib/features/modal/modalSlice'
import {
  toggleFavorites,
  toggleWatchlists,
} from '@/lib/features/movies/moviesSlice'
import { AppDispatch, RootState } from '@/lib/store'
import { toastConfig } from '@/lib/toastConfig'

import Modal from './Modal'
import TooltipButton from './TooltipButton'

type Props = {
  movieId: string
}

const Tooltips = ({ movieId }: Props) => {
  const dispatch: AppDispatch = useDispatch()

  const isFavorite = useSelector(
    (state: RootState) => movieId in state.movies.favorites,
  )
  const isWatchlist = useSelector(
    (state: RootState) => movieId in state.movies.watchlists,
  )
  const isWatched = useSelector(
    (state: RootState) => movieId in state.movies.movieDetails,
  )
  console.log('🚀 ~ Tooltips ~ isWatched:', isWatched)

  const uid = useSelector((state: RootState) => state.auth.user?.uid)

  const [favoriteTip, setFavoriteTip] = useState('')
  const [watchTip, setWatchTip] = useState('')
  const [watchedTip, setWatchedTip] = useState('')

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
    setWatchedTip(
      isWatched ? '鑑賞済みリストから削除する' : '鑑賞済みリストに追加する',
    )
  }, [isFavorite, isWatchlist, isWatched])

  const onToggleFavorites = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    if (!uid) return false

    await dispatch(toggleFavorites({ movieId, uid }))
    setToastMessage(
      isFavorite
        ? 'お気に入りリストから削除しました'
        : 'お気に入りリストに追加しました',
    )
  }

  const onToggleWatchlists = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    if (!uid) return false

    await dispatch(toggleWatchlists({ movieId, uid }))
    setToastMessage(
      isWatchlist
        ? 'ウォッチリストから削除しました'
        : 'ウォッチリストに追加しました',
    )
  }

  const openModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    dispatch(handleModal())
  }

  const closeModal = () => {
    dispatch(handleModal())
  }

  return (
    <div className="md:col-span-2 md:row-span-1 flex gap-4 ml-0 mr-auto w-fit">
      <TooltipButton
        icon={<FaHeart color={isFavorite ? '#ff002d' : 'inherit'} />}
        tip={favoriteTip}
        onClick={(event) => onToggleFavorites(event)}
      />
      <TooltipButton
        icon={<FaBookmark color={isWatchlist ? '#ffe200' : 'inherit'} />}
        tip={watchTip}
        onClick={(event) => onToggleWatchlists(event)}
      />
      <TooltipButton
        icon={<FaEye color={isWatched ? '#0027eb' : 'inherit'} />}
        tip={watchedTip}
        onClick={(event) => openModal(event)}
      />
      <Modal movieId={movieId} onRequestClose={closeModal} />
    </div>
  )
}

export default Tooltips
