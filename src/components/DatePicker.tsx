'use client'

import { registerWatchedDate } from '@/lib/features/lists/listsSlice'
import { toastConfig } from '@/lib/toastConfig'
import { format, parse } from 'date-fns'
import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { User } from '../types/User'
import { RootState } from '@/lib/store'

import { toggle as handleModal } from '@/lib/features/modal/modalSlice'
import { MovieItem } from '../types/Lists'

type Props = {
  movieId: string
  title: string
  checkboxText: string
}

const DatePicker = ({ title, checkboxText, movieId }: Props) => {
  const dispatch = useDispatch()

  const user: User | null = useSelector((state: RootState) => state.auth.user)
  const uid = user?.uid

  const movieListData: MovieItem | null = useSelector(
    (state: RootState) => user && state.lists.movieListData[user.uid],
  )

  const [pickedDate, setPickedDate] = useState<Date | null>(null)

  const handleDateChange = (date: Date) => {
    setPickedDate(date)
  }

  const filterDate = (date: Date) => {
    return date <= new Date()
  }

  const submitPickedDate = async () => {
    if (!user || !pickedDate) return

    const formattedDate = format(pickedDate, 'yyyy-MM-dd')
    await dispatch(
      registerWatchedDate({ movieId, uid, formattedDate, isWatched: true }),
    )

    dispatch(handleModal())
    toast.success('映画鑑賞日を登録しました', toastConfig)
  }

  useEffect(() => {
    if (movieListData && movieListData[movieId].watchedDate) {
      const watchedDate = movieListData[movieId].watchedDate
      setPickedDate(parse(watchedDate, 'yyyy-MM-dd', new Date()))
    } else {
      setPickedDate(new Date())
    }
  }, [movieListData, movieId])

  return (
    <>
      <h2 className="text-md font-bold text-center mb-2">{title}</h2>
      <ReactDatePicker
        selected={pickedDate}
        onChange={handleDateChange}
        filterDate={filterDate}
        dateFormat="yyyy-MM-dd"
        inline
      />
      <div className="form-control">
        <label className="label cursor-pointer flex justify-end row-gap-2">
          <span className="label-text">{checkboxText}</span>
          <input
            type="checkbox"
            className="checkbox  checkbox-info checkbox-sm"
          />
        </label>

        <button
          type="submit"
          onClick={submitPickedDate}
          className="btn btn-accent btn-wide mt-2">
          決定
        </button>
      </div>
    </>
  )
}
export default DatePicker
