import { FaRegUser } from "react-icons/fa6";
import { RiShoppingCart2Fill } from "react-icons/ri";
function Buttons() {
  return (
    <div className="flex items-center font-danaMed gap-3">
      <div className="flex items-center gap-x-2 border-2 p-2 rounded-xl border-gray-300 cursor-pointer">
        <p className="text-sm">حساب کاربری</p>
        <FaRegUser />
      </div>
      <div className="flex items-center border-2 p-2 rounded-xl border-gray-300 gap-x-2 cursor-pointer">
        <RiShoppingCart2Fill />
      </div>
    </div>
  );
}

export default Buttons;
