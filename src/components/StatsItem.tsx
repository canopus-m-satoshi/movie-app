type Props = {
  title: string
  number: number
}

const StatsItem = ({ title, number }: Props) => {
  return (
    <div className="flex min-[450px]:flex-col md:flex-col lg:flex-row items-center gap-2 text-center">
      <div>{title}</div>
      <div className="text-4xl font-bold">{number}</div>
    </div>
  )
}
export default StatsItem
