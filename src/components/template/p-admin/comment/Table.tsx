"use client";

import Modal from "@/components/module/Modal/Modal";
import { useEffect, useState } from "react";
import CommentDetails from "./CommentDetail";
import Swal from "sweetalert2";
import { getDaysAgo } from "@/utils/cal";
import Pagination from "@/components/module/Pagination/Pagination";

type CommentType = {
  _id: string;
  body: string | undefined;
  createdAt: string | undefined;
  isApproved: boolean | undefined;
  likesCount: number | undefined;
  dislikesCount: number | undefined;
  product:
    | {
        title: string | undefined;
      }
    | undefined;
};

const Table = ({
  comments,
  totalPages,
}: {
  comments: CommentType[];
  totalPages: number;
}) => {
  const [commentState, setCommentState] = useState([...comments]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState<CommentType | null>(null);
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
        console.log(data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const openModal = (comment: any) => {
    setIsModalOpen(true);
    setComment(comment);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const removeComment = async (id: string) => {
    Swal.fire({
      title: "آیا از حذف این کامنت مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن!",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/comment/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            Swal.fire("کامنت با موفقیت حذف شد!", "", "success");
            getComments(currentPage);
          }
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      }
    });
  };

  const onAccept = async (id: string) => {
    const res = await fetch(`/api/comment/${comment?._id ?? id}`, {
      method: "PATCH",
    });

    if (res.ok) {
      Swal.fire({
        title: "با موفقعیت وضیعت عوض شد",
        icon: "success",
        confirmButtonText: "باشه",
      }).then((res) => {
        if (res.isConfirmed) {
          onClose();
          getComments(currentPage);
        }
      });
    }
  };

  const approveComment = (id: string) => {
    Swal.fire({
      title: "آیا از تایید این کامنت مطمئن هستید؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله، تایید کن!",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        onAccept(id);
      }
    });
  };

  const rejectComment = (id: string) => {
    Swal.fire({
      title: "آیا از رد این کامنت مطمئن هستید؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله، رد کن!",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        onAccept(id);
      }
    });
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
                    {(currentPage - 1) * 7 + index + 1}
                  </th>
                  <td className="px-6 ss02 py-4">
                    {getDaysAgo(comment.createdAt ?? "")}
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
                      <button
                        onClick={() => removeComment(comment._id)}
                        className="border-2 disabled:cursor-not-allowed disabled:opacity-60 transition-all rounded-xl hover:bg-red-500 hover:text-white border-red-500 text-red-500 px-3 py-2 cursor-pointer"
                      >
                        حذف
                      </button>
                      <button
                        disabled={!comment.isApproved}
                        onClick={() => rejectComment(comment._id)}
                        className="border-2 disabled:cursor-not-allowed disabled:opacity-60 transition-all rounded-xl hover:bg-red-500 hover:text-white border-red-500 text-red-500 px-3 py-2 cursor-pointer"
                      >
                        رد
                      </button>
                      <button
                        disabled={comment.isApproved}
                        onClick={() => approveComment(comment._id)}
                        className="border-2 disabled:cursor-not-allowed disabled:opacity-60 transition-all rounded-xl hover:bg-blue-500 hover:text-white border-blue-500 text-blue-500 px-3 py-2 cursor-pointer"
                      >
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
        isApproved={comment?.isApproved}
        onAccept={onAccept}
        isOpen={isModalOpen}
        onClose={onClose}
        title="جزئیات کامنت"
        acceptLabel="قبول"
        declineLabel="رد"
      >
        <CommentDetails
          body={comment?.body}
          likesCount={comment?.likesCount}
          dislikesCount={comment?.dislikesCount}
          createdAt={comment?.createdAt}
          product={comment?.product}
        />
      </Modal>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default Table;
