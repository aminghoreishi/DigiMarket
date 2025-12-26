"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi2";
import { MdOutlineFileUpload } from "react-icons/md";
import { BeatLoader } from "react-spinners";

export default function EditProductModal({
  setIsModalOpen,
  product,
  getProducts,
  currentPage,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: any;
  getProducts: (page: number) => void;
  currentPage: number;
}) {
  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [count, setCount] = useState(product?.count || 0);
  const [color, setColor] = useState(product?.colors || []);
  const [colorState, setColorState] = useState("");
  const [delivery, setDelivery] = useState(product?.delivery || "");
  const [shortDes, setShortDes] = useState(product?.shortDescription || "");
  const [longDescription, setLongDescription] = useState(
    product?.longDescription || ""
  );
  const [name, setName] = useState(product?.name || "");
  const [images, setImages] = useState(product?.images || []);
  const [features, setFeatures] = useState(product?.features || []);
  const [isLoading, setIsLoading] = useState(false);

  const addColor = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = colorState.trim();
      if (value && !color.includes(value)) {
        setColor([...color, value]);
        setColorState("");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 8 - images.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImages((prev: any) => [...prev, base64String]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev: any[]) => prev.filter((_: any, i: number) => i !== index));
  };

  const editProduct = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/product/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            name,
            price,
            count,
            colors: color,
            delivery,
            shortDescription: shortDes,
            longDescription,
            images,
            features,
          }),
        }
      );

      const response = await res.json();

      if (res.ok) {
        toast.success("محصول با موفقیت ویرایش شد");
        setIsModalOpen(false);
        getProducts(currentPage);
      } else {
        toast.error("خطا در ویرایش محصول. لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      toast.error("خطا در ارتباط با سرور");
    
    } finally {
      setIsLoading(false);
    }
  };

  const removeColor = (colorName: string) => {
    setColor((prev: string[]) => prev.filter((c) => c !== colorName));
  };

  return (
    <div
      onClick={() => setIsModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl text-xs bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-5 bg-brand/5 border-b border-gray-200">
          <h3 className="text-xl font-bold text-heading">ویرایش محصول</h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-heading">
                  عنوان
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                  placeholder="لپ‌تاپ ایسوس..."
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-heading">
                  نام (Slug)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                  placeholder="asus-vivobook"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-heading">
                  قیمت
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                  placeholder="24,500,000"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-heading">
                  موجودی
                </label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                  placeholder="12"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-heading">
                  ارسال (روز)
                </label>
                <input
                  type="text"
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                  placeholder="3"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-heading">
                  رنگ‌ها
                </label>
                <input
                  type="text"
                  value={colorState}
                  onChange={(e) => setColorState(e.target.value)}
                  onKeyDown={addColor}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                  placeholder="مشکی، سفید"
                />
                {color.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {color.map((c: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-300 transition"
                        onClick={() => removeColor(c)}
                      >
                        {c}
                        <span className="mr-1">&times;</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {features.map((fea : any  , index : number) => (
                <div key={fea.name || index}>
                  
                  <label className="block mb-2 text-sm font-medium text-heading">
                    {fea.name}
                  </label>
                  <input
                    type="text"
                    value={fea.value}
                    onChange={(e) => {
                      const updatedFeatures = features.map(
                        (feature: { name: string; value: string }) => {
                          if (feature.name === fea.name) {
                            return { ...feature, value: e.target.value };
                          }
                          return feature;
                        }
                      );
                      setFeatures(updatedFeatures);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                    placeholder={fea.name}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-heading">
                توضیح کوتاه
              </label>
              <textarea
                rows={3}
                value={shortDes}
                onChange={(e) => setShortDes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition resize-none"
                placeholder="لپ‌تاپ سبک و مناسب کارهای روزمره..."
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-heading">
                توضیح کامل
              </label>
              <textarea
                rows={4}
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition resize-none"
                placeholder="مشخصات فنی، ویژگی‌ها و..."
              />
            </div>

            <div>
              <label className="block mb-3 text-sm font-medium text-heading">
                تصاویر محصول
                <span className="text-gray-500 text-xs mr-2">
                  (حداکثر ۸ عکس)
                </span>
              </label>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                {images.length < 8 && (
                  <label className="aspect-square cursor-pointer group">
                    <div className="w-full h-full border-2 border-dashed border-brand/50 bg-brand/5 rounded-xl flex flex-col items-center justify-center hover:bg-brand/10 transition-all">
                      <MdOutlineFileUpload
                        size={36}
                        className="text-brand mb-2"
                      />
                      <span className="text-xs text-brand font-medium">
                        آپلود عکس
                      </span>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}

                {images.map((img: string | StaticImport, index: number) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200"
                  >
                    <Image
                      src={img}
                      alt={`تصویر محصول ${index + 1}`}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => removeImage(index)}
                        className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-lg"
                      >
                        <HiOutlineTrash size={22} />
                      </button>
                    </div>

                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {(index as number) + 1}
                    </div>
                  </div>
                ))}
              </div>

              {images.length === 0 && (
                <p className="text-center text-gray-400 mt-4 text-sm">
                  هنوز عکسی آپلود نشده
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-5 bg-gray-50 border-t border-gray-200">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            لغو
          </button>
          <button
            onClick={editProduct}
            disabled={isLoading}
            className="px-8 py-3 bg-brand text-black rounded-xl font-medium hover:bg-brand-strong transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <BeatLoader size={8} color="black" /> : "ویرایش محصول"}
          </button>
        </div>
      </div>
    </div>
  );
}
