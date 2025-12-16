"use client";

import { useEffect, useState } from "react";

import Swal from "sweetalert2";

function User({ users, totalPages }: { users: any[]; totalPages: number }) {
  const [userState, setUserState] = useState([...users]);
  const [currentPage, setCurrentPage] = useState(1);
  const removeUser = async (id) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این کار قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن!",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser(id);
        Swal.fire("حذف شد!", "کاربر با موفقیت حذف شد.", "success");
      }
    });
  };

  useEffect(() => {
    if (currentPage === 1 && users?.length) {
      setUserState(users);
    } else {
      getUsers();
    }
  }, [users, currentPage]);

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        getUsers();
      }
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const getUsers = async () => {
    try {
      const res = await fetch(`/api/user?page=${currentPage}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserState(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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
            {userState.map((user) => (
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
                    <button
                      onClick={() => removeUser(user._id)}
                      className="border-2 transition-all rounded-xl hover:bg-red-500 hover:text-white border-red-500 text-red-500 px-3 py-2 cursor-pointer"
                    >
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

      {currentPage > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default User;
