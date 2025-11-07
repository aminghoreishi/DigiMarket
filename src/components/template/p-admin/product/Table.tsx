import Image from "next/image";

function Table({ products }) {
  return (
    <div className="mt-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <thead className="text-xs font-danaMed text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                عکس محصول
              </th>
              <th scope="col" className="px-6 py-3">
                اسم محصول
              </th>
              <th scope="col" className="px-6 py-3">
                دسته بندی محصول
              </th>
              <th scope="col" className="px-6 py-3">
                قیمت
              </th>
              <th scope="col" className="px-6 py-3">
                مقدار
              </th>
              <th scope="col" className="px-6 py-3">
                رنگ
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((pro) => (
              <tr className="odd:bg-white font-danaMed even:bg-gray-50 border-b border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <Image src={pro.images[1]} width={100} height={100} />
                </th>
                <td className="px-6 py-4">{pro.name}</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">
                  {pro.price.toLocaleString("fa-IR")}
                </td>
                <td className="px-6 py-4">
                  {pro.count.toLocaleString("fa-IR")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {pro.colors.map((c) => (
                      <div>{c}</div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
