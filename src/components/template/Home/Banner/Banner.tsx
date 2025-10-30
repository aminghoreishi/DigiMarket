import Image from 'next/image'
import React from 'react'

function Banner() {
  return (
    <div className='container mx-auto mt-12'>
        <div className='grid  md:grid-cols-2 gap-5'>
            <div className="">
                <Image className='rounded-4xl' src="/image/Banner1.webp" alt='Banner' width={900} height={200} />
            </div>
            <div className="">
                <Image className='rounded-4xl' src="/image/Banner2.webp" alt='Banner' width={900} height={200} />
            </div>
        </div>
    </div>
  )
}

export default Banner