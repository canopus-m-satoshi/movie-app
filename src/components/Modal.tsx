'use client'

import ReactModal from 'react-modal'
import { RxCross2 } from 'react-icons/rx'
import DatePicker from './DatePicker'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

import { toggle as handleModal } from '@/lib/features/modal/modalSlice'

type Props = {
  movieId: string
  onRequestClose: () => void
}

ReactModal.setAppElement('html')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    paddingInline: '10px',
  },
}

const Modal = ({ movieId, onRequestClose }: Props) => {
  const dispatch = useDispatch()

  const { toggle, stack } = useSelector((state: RootState) => state.modal)

  const closeModal = () => {
    dispatch(handleModal())
  }

  return (
    <ReactModal
      isOpen={toggle}
      style={customStyles}
      contentLabel="鑑賞日選択モーダル"
      onRequestClose={onRequestClose}>
      <button onClick={closeModal} className="absolute top-2 right-2">
        <RxCross2 />
      </button>
      <div className="text-center">
        <DatePicker
          title="鑑賞日を選択"
          checkboxText="鑑賞日は不明"
          movieId={movieId}
        />
      </div>
    </ReactModal>
  )
}
export default Modal
