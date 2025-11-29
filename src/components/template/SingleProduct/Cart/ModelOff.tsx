import React from 'react'

function ModelOff() {
  return (
    <div  className='min-h-screen fixed inset-0 flex items-center justify-center p-5 text-center'>
        <div className='bg-black/60 fixed inset-0 z-auto'></div>
        <div className='bg-white rounded-xl z-40  p-5 max-w-md w-full shadow-lg'>
            <h2 className='font-danaMed text-lg mb-4'>ایا کد تخفیف دارید؟</h2>
            <p className='font-danaMed text-sm mb-6'>
                <input type="text" className='outline-0 border border-gray-300 rounded-md p-2 w-full' />
            </p>
            <div className='flex justify-center gap-4'>
                <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-danaMed text-sm'>مشاهده سبد خرید</button>
                <button className='bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg font-danaMed text-sm'>ادامه خرید</button>
            </div>
        </div>
    </div>
  )
}

export default ModelOff