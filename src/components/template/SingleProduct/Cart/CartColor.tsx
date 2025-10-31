import React from 'react'

function CartColor() {
  return (
    <div>
        <h2 className='font-danaMed'>رنگ:</h2>

        <div className="flex items-center gap-2">
            <div className='border-2 flex  items-center p-2 font-danaMed text-sm gap-x-1 cursor-pointer rounded-xl border-zinc-200'>
                <div className='size-5 bg-gray-200 rounded-full'></div>
                <p>خاکستری</p>
            </div>
              <div className='border-2 flex  items-center p-2 font-danaMed text-sm gap-x-1 cursor-pointer rounded-xl border-zinc-200'>
                <div className='size-5 bg-gray-200 rounded-full'></div>
                <p>خاکستری</p>
            </div>
              <div className='border-2 flex  items-center p-2 font-danaMed text-sm gap-x-1 cursor-pointer rounded-xl border-zinc-200'>
                <div className='size-5 bg-gray-400 rounded-full'></div>
                <p>خاکستری</p>
            </div>
        </div>
    </div>
  )
}

export default CartColor