type Props = {
  watchedAt: string
}

const MovieWatchedAt = ({ watchedAt }: Props) => {
  return <p>鑑賞日：{watchedAt}</p>
}
export default MovieWatchedAt
