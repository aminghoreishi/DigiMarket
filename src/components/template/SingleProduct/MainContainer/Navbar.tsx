import React from 'react'

function Navbar() {
  return (
    <ul className='flex max-sm:gap-3 max-sm:text-xs gap-8 border-b-2 border-b-zinc-200 pb-4 mt-8 text-gray-600 font-danaMed cursor-pointer'>
        <li>توضیحات</li>
        <li>مشخصات</li>
        <li>دیدگاه</li>
        <li>پرسش ها</li>
    </ul>
  )
}

export default Navbar