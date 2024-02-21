import React from 'react'
import spinnerImg from '../../Assets/img/Spinner01.gif'

const Spinner = () => {
  return (
    <div>
      <img src={spinnerImg} alt="spinner is not found !" className='d-block m-auto ' style={{width:"200px"}} />
    </div>
  )
}

export default Spinner
