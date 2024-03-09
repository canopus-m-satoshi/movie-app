type Props = {
  icon: React.ReactNode
  tip: string
}

const TooltipButton = ({ icon, tip }: Props) => {
  return (
    <div className="tooltip" data-tip={tip}>
      <button className="btn rounded-badge">{icon}</button>
    </div>
  )
}
export default TooltipButton
