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
  movieListStatus: {
    favorites: boolean
    watchlists: boolean
  }
}
// APIを作成してfirestoreから値を取れる様になったが、Tooltiipのトグルがうまくいかなくなったのでそこから対応する

const Tooltips = ({ movieId, movieListStatus }: Props) => {
  const dispatch: AppDispatch = useDispatch()

  const { favorites, watchlists } = movieListStatus

  const uid = useSelector((state: RootState) => state.auth.user?.uid)

  const [favoriteTip, setFavoriteTip] = useState('')
  const [watchTip, setWatchTip] = useState('')
  // const [watchedTip, setWatchedTip] = useState('')

  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage, toastConfig)
      setToastMessage('')
    }
  }, [toastMessage])

  // useEffectを使用してツールチップのテキストを更新
  useEffect(() => {
    console.log('Rerendered')

    setFavoriteTip(
      favorites ? 'お気に入りから削除する' : 'お気に入りに追加する',
    )
    setWatchTip(
      watchlists ? 'ウォッチリストから削除する' : 'ウォッチリストに追加する',
    )
    // setWatchedTip(
    //   isWatched ? '鑑賞済みリストから削除する' : '鑑賞済みリストに追加する',
    // )
  }, [favorites, watchlists])

  const onToggleFavorites = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    if (!uid) return false

    await dispatch(toggleFavorites({ movieId, uid }))
    setToastMessage(
      favorites
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
      watchlists
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
        icon={<FaHeart color={favorites ? '#ff002d' : 'inherit'} />}
        tip={favoriteTip}
        onClick={(event) => onToggleFavorites(event)}
      />
      <TooltipButton
        icon={<FaBookmark color={watchlists ? '#ffe200' : 'inherit'} />}
        tip={watchTip}
        onClick={(event) => onToggleWatchlists(event)}
      />
      {/* <TooltipButton
        icon={<FaEye color={isWatched ? '#0027eb' : 'inherit'} />}
        tip={watchedTip}
        onClick={(event) => openModal(event)}
      /> */}
      <Modal movieId={movieId} onRequestClose={closeModal} />
    </div>
  )
}

export default Tooltips
