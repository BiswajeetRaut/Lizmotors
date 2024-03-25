import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import "./Loader.css";
const Loader = () => {
  return (
    <div className='loaderpage'>
      Fetching the data from database....
      <TailSpin color="green" radius={"5px"} />
    </div>
  )
}

export default Loader
