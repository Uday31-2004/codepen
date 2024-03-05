import React from 'react'
import { Triangle } from 'react-loader-spinner'
const Spinner = () => {
  return (
    <div><Triangle
    visible={true}
    height="100"
    width="100"
    color="#4fa94d"
    ariaLabel="triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
  /></div>
  )
}

export default Spinner