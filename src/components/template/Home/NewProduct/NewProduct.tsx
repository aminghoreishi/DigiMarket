import TopSubject from '@/components/module/TopSubject/TopSubject'
import React from 'react'
import SwiperPop from '../popProduct/SwiperPop'

function NewProduct() {
  return (
    <div className='mt-12'>
        <TopSubject title='جدید ترین محصولات'/>
        <SwiperPop/>
    </div>
  )
}

export default NewProduct