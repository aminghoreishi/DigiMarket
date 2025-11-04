function FormContainer({ categories }) {
  return (
    <div>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 gap-6">
          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              نام محصول
            </label>
            <input
              type="text"
              className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
            />
          </div>
          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              قیمت محصول
            </label>
            <input
              type="text"
              className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
            />
          </div>
          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              دسته بندی محصول
            </label>
            <select
              name=""
              id=""
              className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
            >
              <option value="">انتخاب دسته بندی</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              عکس های محصول
            </label>
            <input
              type="file"
              className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormContainer;
