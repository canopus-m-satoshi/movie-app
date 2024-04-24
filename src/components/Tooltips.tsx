import React from 'react'
import { FaBookmark, FaHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'

import { toastConfig } from '@/lib/toastConfig'
import { MovieListStatusData } from '@/types/Lists'

import TooltipButton from './TooltipButton'

type Props = {
  movieListStatus: MovieListStatusData
  onToggleFavorites: () => Promise<boolean | undefined>
  onToggleWatchlists: () => Promise<boolean | undefined>
}

const Tooltips = ({
  movieListStatus,
  onToggleFavorites,
  onToggleWatchlists,
}: Props) => {
  const { favorites, watchlists } = movieListStatus

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

  return (
    <div className="md:col-span-2 md:row-span-1 flex gap-4 mt-4 ml-0 mr-auto w-fit">
      <TooltipButton
        icon={<FaHeart color={favorites ? '#ff002d' : 'inherit'} />}
        tip={
          favorites
            ? 'ウォッチリストから削除します'
            : 'ウォッチリストに追加します'
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
    </div>
  )
}

export default Tooltips
