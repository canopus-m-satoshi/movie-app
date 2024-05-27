'use client'

import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { toggleModal } from '@/lib/features/modal/modalSlice'
import { regisrerWatched } from '@/lib/features/movies/moviesSlice'
import { AppDispatch } from '@/lib/store'
import { toastConfig } from '@/lib/toastConfig'

type Props = {
  movieId: string
  title: string
  checkboxText: string
  uid: string
  watcedAt: Date | string | null
}

const DatePicker = ({ title, checkboxText, movieId, uid, watcedAt }: Props) => {
  const dispatch: AppDispatch = useDispatch()

  const [pickedDate, setPickedDate] = useState(
    watcedAt ? new Date(watcedAt) : null,
  )

  const [isUnknown, setIsUnknown] = useState(watcedAt === null)

  const handleDateChange = (date: Date) => {
    setPickedDate(date)
    setIsUnknown(false)
  }

  const handleOnChange = () => {
    setIsUnknown((prevIsChecked) => {
      const newIsChecked = !prevIsChecked
      if (newIsChecked) {
        setPickedDate(null)
      }
      return newIsChecked
    })
  }

  const filterDate = (date: Date) => date <= new Date()

  const submitPickedDate = async () => {
    if (isUnknown) setPickedDate(null)

    await dispatch(regisrerWatched({ movieId, uid, watchedAt: pickedDate }))
    await dispatch(toggleModal())

    toast.success('映画鑑賞日を登録しました', toastConfig)
  }

  return (
    <>
      <h2 className="text-md font-bold text-center mb-2">{title}</h2>
      <ReactDatePicker
        selected={pickedDate}
        onChange={handleDateChange}
        filterDate={filterDate}
        dateFormat="yyyy-MM-dd"
        disabled={isUnknown}
        inline
      />
      <div className="form-control">
        <label className="label cursor-pointer flex justify-end row-gap-2 w-fit ml-auto">
          <span className="label-text">{checkboxText}</span>
          <input
            type="checkbox"
            className="checkbox checkbox-info checkbox-sm"
            checked={isUnknown}
            onChange={handleOnChange}
          />
        </label>

        <button
          type="submit"
          onClick={submitPickedDate}
          className="btn btn-accent btn-wide mt-2"
          disabled={!pickedDate && !isUnknown}>
          決定
        </button>
      </div>
    </>
  )
}
export default DatePicker
