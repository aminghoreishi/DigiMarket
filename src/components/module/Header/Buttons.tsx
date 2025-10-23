import { FaUser } from "react-icons/fa6";
import { RiShoppingCart2Fill } from "react-icons/ri";
function Buttons() {
  return (
    <div className="flex items-center font-danaMed gap-5">
      <div className="flex items-center gap-x-2 cursor-pointer">
        <FaUser color="red" />
        <p className="text-sm">ورود | ثبت نام</p>
      </div>
      <div className="flex items-center gap-x-2 cursor-pointer">
        <RiShoppingCart2Fill color="red" />
        <p className="text-sm">سبد خرید</p>
      </div>
    </div>
  );
}

export default Buttons;
