import Link from 'next/link'
import { IoCaretBackOutline } from 'react-icons/io5'

type Props = {
  link: string
}

const BackButton = ({ link }: Props) => {
  return (
    <Link href={link} className="btn btn-accent rounded-full">
      <IoCaretBackOutline />
      <span className="pr-2">戻る</span>
    </Link>
  )
}
export default BackButton
