type Props = {
  title: string
  number: number
}

const StatsItem = ({ title, number }: Props) => {
  return (
    <div className="sm:row-start-2 lg:row-start-auto flex sm:flex-col items-center gap-2 text-center">
      <div>{title}</div>
      <div className="text-4xl font-bold">{number}</div>
    </div>
  )
}
export default StatsItem
