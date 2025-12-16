import React from "react";

function User({ users }) {
  return (
    <div className="mt-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <thead className="text-xs font-danaMed text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                اسم
              </th>
              <th scope="col" className="px-6 py-3">
                ایمیل
              </th>
              <th scope="col" className="px-6 py-3">
                شماره موبایل
              </th>
              <th scope="col" className="px-6 py-3">
                نقش
              </th>
              <th scope="col" className="px-6 py-3">
                تاریخ ایجاد
              </th>
              <th scope="col" className="px-6 py-3">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="odd:bg-white font-danaMed even:bg-gray-50 border-b border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {user.fullName}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  {user.phone ? user.phone : "ندارد"}
                </td>
                <td className="px-6 py-4">
                  {user.role === "ADMIN" ? "ادمین" : "کاربر"}
                </td>
                <td className="px-6 py-4 ss02">
                  {new Date(user.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="border-2 transition-all rounded-xl hover:bg-red-500 hover:text-white border-red-500 text-red-500 px-3 py-2 cursor-pointer">
                      حذف
                    </button>
                    <button className="border-2 transition-all rounded-xl hover:bg-blue-500 hover:text-white border-blue-500 text-blue-500 px-3 py-2 cursor-pointer">
                      ویرایش
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

export default User;
