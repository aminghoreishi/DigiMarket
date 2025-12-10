import { FaShoppingCart } from "react-icons/fa";
import { FaBox, FaCheck, FaUser } from "react-icons/fa6";
function Information({
  productsCount,
  usersCount,
  ordersCount,
}: {
  productsCount: number;
  usersCount: number;
  ordersCount: number;
}) {
  return (
    <div className="grid  grid-cols-2 lg:grid-cols-4 gap-5 mt-10 font-danaMed">
      <div className="flex items-center gap-3 bg-blue-500 text-white rounded-xl shadow-lg   py-3 px-2 text-sm">
        <div className="bg-blue-700 p-2 rounded-lg">
          <FaShoppingCart size={20} color="white" />
        </div>
        <div>
          <div className="max-md:text-xs">تعداد محصولات</div>
          <p className="ss02">{productsCount}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-red-500 text-white rounded-xl shadow-lg  py-3 px-2 text-sm">
        <div className="bg-red-700 p-2 rounded-lg">
          <FaUser size={20} color="white" />
        </div>
        <div>
          <div className="max-md:text-xs">تعداد کاربران</div>
          <p className="ss02">{usersCount}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-green-500 text-white rounded-xl shadow-lg   py-3 px-2 text-sm">
        <div className="bg-green-700 p-2 rounded-lg">
          <FaBox size={20} color="white" />
        </div>
        <div>
          <div className="max-md:text-xs">تعداد سفارش ها</div>
          <p className="ss02">{ordersCount}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-yellow-500 text-white rounded-xl shadow-lg   py-3 px-2 text-sm">
        <div className="bg-yellow-700 p-2 rounded-lg">
          <FaCheck size={20} color="white" />
        </div>
        <div>
          <div className="max-md:text-xs">تحویل داده شده</div>
          <p className="ss02">0</p>
        </div>
      </div>
    </div>
  );
}

export default Information;
