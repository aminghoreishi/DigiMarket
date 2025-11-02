import { RiTruckLine } from "react-icons/ri";
function FeatureFooter() {
  return (
    <div className='border-2 border-zinc-200 rounded-3xl px-8'>
        <div className="flex items-center justify-center gap-1 font-danaMed text-xs ">
            <div>
                <RiTruckLine size={40} className="m-4 text-red-600"/>
            </div>
            <div className="flex flex-col gap-1">
                <p>ارسال سریع</p>
                <p className="text-zinc-400">ارسال در سریع ترین زمان</p>
            </div>
        </div>
    </div>
  )
}

export default FeatureFooter