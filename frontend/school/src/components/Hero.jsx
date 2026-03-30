import React from 'react'

function Hero() {
  return (
    <div className='relative h-[300px] md:h-[500px] w-full'>
      <img
        src='/hero.jpg'
        alt="School"
        className="absolute inset-0 w-full h-full object-cover object-left"
      />
    </div>
  )
}

export default Hero