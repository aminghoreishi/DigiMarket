import Image from "next/image";
import { MdNoPhotography } from "react-icons/md";
type SubCategory = {
  _id: string;
  title: string;
  category: { title: string };
  href: string;
  img?: string | null; // اختیاری و ممکنه null باشه
};

function subCategoryTable({ data }: { data: SubCategory[] }) {
  return (
    <div className="mt-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <thead className="text-xs font-danaMed text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                شماره
              </th>
              <th scope="col" className="px-6 py-3">
                عکس
              </th>
              <th scope="col" className="px-6 py-3">
                عنوان
              </th>
              <th scope="col" className="px-6 py-3">
                والد
              </th>
              <th scope="col" className="px-6 py-3">
                لینک
              </th>
              <th scope="col" className="px-6 py-3">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item._id}
                className="odd:bg-white font-danaMed even:bg-gray-50 border-b border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 ss02 font-medium text-gray-900 whitespace-nowrap"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">
                  {item.img ? (
                    <Image
                      src={item.img}
                      width={90}
                      height={90}
                      alt="subCategory"
                    />
                  ) : (
                    <MdNoPhotography className="text-gray-400" size={40} />
                  )}
                </td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.category.title}</td>
                <td className="px-6 py-4">{item.href}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="text-blue-600 hover:underline">
                      ویرایش
                    </button>
                    <button className="text-red-600 hover:underline mr-2">
                      حذف
                    </button>
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

export default subCategoryTable;
