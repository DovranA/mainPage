const Carousel = () => {
  return (
    <div className='carousel'>
      <div className='controlBtns'>
        <span className='controlBtn'>
          <i className='bi bi-chevron-left'></i>
        </span>
        <span className='controlBtn'>
          <i className='bi bi-chevron-right'></i>
        </span>
      </div>
      <div className='pagination'>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}
export default Carousel
