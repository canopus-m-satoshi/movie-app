type Props = {
  icon: React.ReactNode
  tip: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const TooltipButton = ({ icon, tip, onClick }: Props) => {
  return (
    <div className="tooltip" data-tip={tip}>
      <button className="btn rounded-badge" onClick={onClick}>
        {icon}
      </button>
    </div>
  )
}
export default TooltipButton
