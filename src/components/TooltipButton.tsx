type Props = {
  icon: React.ReactNode
  tip: string
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void
}

const TooltipButton = ({ icon, tip, onClick }: Props) => {
  const _onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (onClick) {
      onClick(event)
    }
  }

  return (
    <div className="tooltip" data-tip={tip}>
      <button className="btn rounded-badge" onClick={_onClick}>
        {icon}
      </button>
    </div>
  )
}
export default TooltipButton
