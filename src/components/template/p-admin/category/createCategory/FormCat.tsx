

function FormCat() {
  return (
  
      <form className="font-danaMed">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="">نام دسته بندی</label>
            <input type="text" className="border-2 mt-2 w-full outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2 text-sm border-zinc-200" />
          </div>
                  <div>
            <label className="">لینک</label>
            <input type="text" className="border-2 mt-2 w-full outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2 text-sm border-zinc-200" />
          </div>
          <div>
            <button className="px-4 py-2 bg-blue-500 transition-all cursor-pointer hover:bg-blue-600 text-white rounded-md mt-4 font-danaMed text-xs">ایجاد دسته بندی</button>
          </div>
        </div>
      </form>

  )
}

export default FormCat