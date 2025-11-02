import TopSubject from '@/components/module/TopSubject/TopSubject'
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