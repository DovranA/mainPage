type Props = {
  count: number
}
const NotificationBtn = ({ count }: Props) => {
  return (
    <span className='notice'>
      <span className='count'>{count}</span>
      <i className='bi bi-bell'></i>
    </span>
  )
}
export default NotificationBtn
