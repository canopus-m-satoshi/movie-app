type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (index: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  return (
    <div className="join block w-fit mx-auto mt-6">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`join-item btn btn-square ${
            currentPage === index + 1 ? 'btn-active btn-primary' : ''
          }`}
          onClick={() => {
            onPageChange(index)
          }}>
          {index + 1}
        </button>
      ))}
    </div>
  )
}
export default Pagination
