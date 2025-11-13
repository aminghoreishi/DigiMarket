"use client";

import Modal from "@/components/module/Modal/Modal";
import { useEffect, useMemo, useState } from "react";
import CommentDetails from "./CommentDetail";
import Swal from "sweetalert2";

const jalaali = require("jalaali-js");

const Table = ({ comments }: { comments: any[] }) => {
  const [commentState, setCommentState] = useState([...comments]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage === 1 && comments?.length) {
      setCommentState(comments);
    } else {
      getComments(currentPage);
    }
  }, [currentPage, comments]);

  const getComments = async (page: number) => {
    try {
      const res = await fetch(`/api/comment?page=${page}`);
      if (res.ok) {
        const data = await res.json();
        setCommentState(data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const getDaysAgo = (createdAt: string) => {
    const commentDate = new Date(createdAt);
    const today = new Date();

    const commentJalali = jalaali.toJalaali(commentDate);
    const todayJalali = jalaali.toJalaali(today);

    const commentJalaliDate = new Date(
      commentJalali.jy,
      commentJalali.jm - 1,
      commentJalali.jd
    );
    const todayJalaliDate = new Date(
      todayJalali.jy,
      todayJalali.jm - 1,
      todayJalali.jd
    );

    const diffTime = todayJalaliDate.getTime() - commentJalaliDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return <p className="text-green-500">امروز</p>;
    if (diffDays === 1) return "دیروز";
    if (diffDays < 7) return `${diffDays} روز پیش`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} هفته پیش`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ماه پیش`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} سال پیش`;
  };

  const openModal = (comment) => {
    setIsModalOpen(true);
    setComment(comment);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const onAccept = async () => {
    const res = await fetch(`/api/comment/${comment._id}`, {
      method: "PATCH",
    });

    if (res.ok) {
      Swal.fire({
        title: "با موفقعیت قبول شد",
      }).then((res) => {});
      getComments();
    }
  };
  return (
    <>
      <div className="mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-600">
            <thead className="text-xs font-danaMed text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  شماره
                </th>
                <th scope="col" className="px-6 py-3">
                  تاریخ کامنت
                </th>
                <th scope="col" className="px-6 py-3">
                  تاییده شده
                </th>
                <th scope="col" className="px-6 py-3">
                  مشاهده بیشتر
                </th>
                <th scope="col" className="px-6 py-3">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {commentState.map((comment, index) => (
                <tr
                  key={comment._id}
                  className="odd:bg-white font-danaMed even:bg-gray-50 border-b border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 ss02 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 ss02 py-4">
                    {getDaysAgo(comment.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    {comment.isApproved ? "بله" : "خیر"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(comment)}
                      className="border-2 transition-all rounded-xl hover:bg-green-500 hover:text-white border-green-500 text-green-500 px-3 py-2 cursor-pointer"
                    >
                      مشاهده
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="border-2 transition-all rounded-xl hover:bg-red-500 hover:text-white border-red-500 text-red-500 px-3 py-2 cursor-pointer">
                        حذف
                      </button>
                      <button className="border-2 transition-all rounded-xl hover:bg-blue-500 hover:text-white border-blue-500 text-blue-500 px-3 py-2 cursor-pointer">
                        تایید
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isApproved={comment.isApproved}
        onAccept={onAccept}
        isOpen={isModalOpen}
        onClose={onClose}
        title="جزئیات کامنت"
        acceptLabel="قبول"
        declineLabel="رد"
      >
        <CommentDetails
          body={comment.body}
          likesCount={comment.likesCount}
          dislikesCount={comment.dislikesCount}
          createdAt={comment.createdAt}
          product={comment.product?.title}
        />
      </Modal>
    </>
  );
};

export default Table;
