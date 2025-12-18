"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function FormFooter({ footer }) {
  console.log(footer);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [aboutUs, setAboutUs] = useState(footer[0]?.aboutUs || "");

  const [email, setEmail] = useState(footer[0]?.contactInfo.email || "");
  const [phone, setPhone] = useState(footer[0]?.contactInfo.phone || "");
  const [address, setAddress] = useState(footer[0]?.contactInfo.address || "");

  const [telegram, setTelegram] = useState(
    footer[0]?.socialMediaLinks.telegram || ""
  );
  const [instagram, setInstagram] = useState(
    footer[0]?.socialMediaLinks.instagram || ""
  );
  const [linkedin, setLinkedin] = useState(
    footer[0]?.socialMediaLinks.linkedin || ""
  );
  const [whatsapp, setWhatsapp] = useState(
    footer[0]?.socialMediaLinks.whatsapp || ""
  );

  const [featuredLinks, setFeaturedLinks] = useState<any[]>(
    footer[0]?.featuredLinks || []
  );
  const [isType, setIsType] = useState(false);

  useEffect(() => {
    setIsType(Boolean(name && slug));
  }, [name, slug]);

  const addFeaturedLinks = () => {
    const item = {
      name,
      slug,
      img,
    };

    setFeaturedLinks((prev) => [...prev, item]);
    setName("");
    setSlug("");
    setImg(null);
  };

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!img) {
      alert("عکس را انتخاب کنید");
      return;
    }

    const formData = new FormData();

    formData.append("img", img as unknown as File);
    formData.append("aboutUs", aboutUs);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);

    formData.append("featuredLinks", JSON.stringify(featuredLinks));

    formData.append(
      "socialMediaLinks",
      JSON.stringify({
        telegram,
        instagram,
        linkedin,
        whatsapp,
      })
    );

    const res = await fetch("/api/footer", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      Swal.fire({
        title: "با موفقعیت ثبت شد",
        icon: "success",
        confirmButtonText: "باشه",
        customClass: {
          popup: "!text-xs",
        },
      });
    }
  };

  return (
    <div className="font-danaMed">
      <form onSubmit={handlerSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-sm" htmlFor="">
                  عنوان
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2 block outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm w-full"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  اسلاگ (slug)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="border-2 block outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm w-full"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  عکس
                </label>
                <input
                  type="file"
                  onChange={(e) => setImg(e.target.files?.[0])}
                  className="border-2 block outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm w-full"
                />
              </div>
            </div>

            {isType && (
              <button
                onClick={addFeaturedLinks}
                type="button"
                className="bg-blue-500 text-sm max-sm:text-xs text-white px-3 py-2 rounded-xl cursor-pointer mt-4"
              >
                افزودن عنوان
              </button>
            )}

            {featuredLinks.length > 0 && (
              <div className="mt-3">
                <p className="text-sm mb-2">عنوان‌های اضافه شده:</p>
                {featuredLinks.map((fe, index) => (
                  <div key={index} className="text-sm">
                    {fe.name} ({fe.slug})
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-3 mt-5">
            <p className="mb-3">فضای مجازی</p>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
              <div>
                <label className="text-sm" htmlFor="">
                  تلگرام
                </label>
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="border-2 w-full block outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  اینستاگرام
                </label>
                <input
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  type="text"
                  className="border-2 w-full block outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  لینکدین
                </label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="border-2 w-full block outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  واتساپ
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="border-2 w-full block outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="col-span-3 mt-5">
            <p className="mb-3">اطلاعات</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div>
                <label className="text-sm" htmlFor="">
                  ادرس
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border-2 w-full block outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  موبایل
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-2 w-full block outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  ایمیل
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 w-full block outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <label className="text-sm" htmlFor="">
              توضیحات
            </label>
            <input
              type="text"
              value={aboutUs}
              onChange={(e) => setAboutUs(e.target.value)}
              className="border-2 block outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm w-full"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-sm max-sm:text-xs text-white px-3 py-2 rounded-xl cursor-pointer"
          >
            افزودن
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormFooter;
