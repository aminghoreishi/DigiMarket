function FormCheck() {
  return (
    <div className="border-2 border-zinc-200 rounded-xl p-5">
      <form>
        <div className="grid grid-cols-12 font-danaMed gap-4">
          <div className="col-span-6">
            <label className="text-sm" htmlFor="name">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              id="name"
              className="w-full border-2 max-sm:text-xs rounded-xl text-sm border-zinc-200 outline-0 mt-2 p-2 mt-1"
            />
          </div>
          <div className="col-span-6">
            <label className="text-sm" htmlFor="phone">
              شماره تماس <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              className="w-full border-2 max-sm:text-xs rounded-xl text-sm border-zinc-200 outline-0 mt-2 p-2 mt-1"
            />
          </div>
          <div className="col-span-6">
            <label className="text-sm" htmlFor="phone">
              شماره تماس
            </label>
            <input
              type="text"
              id="phone"
              className="w-full border-2 max-sm:text-xs rounded-xl text-sm border-zinc-200 outline-0 mt-2 p-2 mt-1"
            />
          </div>
          <div className="col-span-6">
            <label className="text-sm" htmlFor="phone">
              شماره تماس
            </label>
            <input
              type="text"
              id="phone"
              className="w-full border-2 max-sm:text-xs rounded-xl text-sm border-zinc-200 outline-0 mt-2 p-2 mt-1"
            />
          </div>
          <div className="col-span-12">
            <label className="text-sm" htmlFor="phone">
              خیابان و کوچه و شماره پلاک و واحد{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              className="w-full border-2 max-sm:text-xs rounded-xl text-sm border-zinc-200 outline-0 mt-2 p-2 mt-1"
            />
          </div>
          <div className="col-span-6">
            <label className="text-sm" htmlFor="phone">
              شماره تماس
            </label>
            <input
              type="text"
              id="phone"
              className="w-full border-2 max-sm:text-xs rounded-xl text-sm border-zinc-200 outline-0 mt-2 p-2 mt-1"
            />
          </div>
          <div className="col-span-6">
            <label className="text-sm" htmlFor="phone">
              شماره تماس
            </label>
            <input
              type="text"
              id="phone"
              className="w-full border-2 max-sm:text-xs rounded-xl text-sm border-zinc-200 outline-0 mt-2 p-2 mt-1"
            />
          </div>
          <div className="col-span-12">
            <label className="text-sm" htmlFor="phone">
              خیابان و کوچه و شماره پلاک و واحد{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="phone"
              className="w-full border-2 max-sm:text-xs rounded-xl text-sm border-zinc-200 outline-0 mt-2 p-2 mt-1"
            />
          </div>
            <div className="col-span-12">
          <div className="flex justify-between">
            <div>
              <button>پست پیشتاز</button>
            </div>
                 <div>
              <button>پست عادی</button>
            </div>
          </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormCheck;
