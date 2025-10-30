import { MdKeyboardArrowLeft } from "react-icons/md";
function BredCrumbs() {
  return (
    <div className="flex items-center gap-x-3 font-danaMed text-xs">
      <div className="flex items-center gap-3">
        <p>کالای دیجیتال</p>
        <MdKeyboardArrowLeft  />
      </div>
      <div className="flex items-center gap-3">
        <p>موبایل</p>
        <MdKeyboardArrowLeft />
      </div>
      <div>
        <p>iphon 13 pro max</p>
      </div>
    </div>
  );
}

export default BredCrumbs;
