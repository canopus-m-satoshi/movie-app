import React from 'react'
import { FaBookmark, FaEye, FaHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'

import { toastConfig } from '@/lib/toastConfig'
import { MovieListStatusData } from '@/types/Movie'

import TooltipButton from './TooltipButton'

type Props = {
  movieListStatus: MovieListStatusData
  onToggleFavorites: () => Promise<boolean | undefined>
  onToggleWatchlists: () => Promise<boolean | undefined>
  onToggleModal: () => void
}

const Tooltips = ({
  movieListStatus,
  onToggleFavorites,
  onToggleWatchlists,
  onToggleModal,
}: Props) => {
  const { favorites, watchlists, isWatched } = movieListStatus

  const _onToggleFavorites = async () => {
    const on = await onToggleFavorites()

    if (on === undefined) return

    toast.success(
      on
        ? 'お気に入りリストから追加しました'
        : 'お気に入りリストに削除しました',
      toastConfig,
    )
  }

  const _onToggleWatchlists = async () => {
    const on = await onToggleWatchlists()

    if (on === undefined) return

    toast.success(
      on ? 'ウォッチリストから追加しました' : 'ウォッチリストに削除しました',
      toastConfig,
    )
  }

  const _onToggleModal = async () => {
    await onToggleModal()
  }

  return (
    <div className="md:col-span-2 md:row-span-1 flex gap-4 mt-4 ml-0 mr-auto w-fit">
      <TooltipButton
        icon={<FaHeart color={favorites ? '#ff002d' : 'inherit'} />}
        tip={
          favorites
            ? 'お気に入りリストから削除します'
            : 'お気に入りリストに追加します'
        }
        onClick={_onToggleFavorites}
      />
      <TooltipButton
        icon={<FaBookmark color={watchlists ? '#ffe200' : 'inherit'} />}
        tip={
          watchlists
            ? 'ウォッチリストから削除します'
            : 'ウォッチリストに追加します'
        }
        onClick={_onToggleWatchlists}
      />
      <TooltipButton
        icon={<FaEye color={isWatched ? '#0022ff' : 'inherit'} />}
        tip={isWatched ? '鑑賞日を変更する' : '鑑賞日を記録する'}
        onClick={_onToggleModal}
      />
    </div>
  )
}

export default Tooltips
