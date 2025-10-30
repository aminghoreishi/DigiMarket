import { AiOutlineMessage } from "react-icons/ai";
function Info() {
  return (
    <div className="mt-5">
      <div>
        <h2 className="font-danaMed text-lg">
          لپ تاپ 13.3 اینچی ایسوس مدل Zenbook S 13 OLED UX5304VA
        </h2>
      </div>
      <div className="mt-3">
        <p className="text-sm text-zinc-400">
          Asus Zenbook S 13 OLED UX5304VA-NQ003 13.3 Inch Laptop
        </p>
      </div>
      <div className="flex items-center mt-3 gap-3">
        <div className="flex items-center font-danaMed text-orange-400 text-sm gap-2">
            <AiOutlineMessage />
            <p><span>2</span> دیدگاه</p>
        </div>
        <div className="text-sm" dir="rtl">
            <p>(72) 4.4</p>
        </div>
      </div>

    </div>
  );
}

export default Info;
