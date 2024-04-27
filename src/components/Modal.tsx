import { Timestamp } from 'firebase/firestore'
import { RxCross2 } from 'react-icons/rx'
import ReactModal from 'react-modal'
import { useDispatch } from 'react-redux'

import { toggleModal } from '@/lib/features/modal/modalSlice'

import DatePicker from './DatePicker'

type Props = {
  movieId: string
  toggle: boolean
  stack: string[]
  uid: string
  watcedAt: Date | string | null
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

const Modal = ({ movieId, toggle, uid, watcedAt }: Props) => {
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    dispatch(toggleModal())
  }

  return (
    <ReactModal
      isOpen={toggle}
      style={customStyles}
      contentLabel="鑑賞日選択モーダル"
      onRequestClose={handleCloseModal}>
      <button onClick={handleCloseModal} className="absolute top-2 right-2">
        <RxCross2 />
      </button>
      <div className="text-center">
        <DatePicker
          title="鑑賞日を選択"
          checkboxText="鑑賞日不明"
          movieId={movieId}
          uid={uid}
          watcedAt={watcedAt}
        />
      </div>
    </ReactModal>
  )
}
export default Modal
