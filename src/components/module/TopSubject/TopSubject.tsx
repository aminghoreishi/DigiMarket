import { TopSubjectProps } from "@/types/topSubject.type";
import { IoIosArrowRoundBack } from "react-icons/io";
const TopSubject: React.FC<TopSubjectProps> = ({ title }) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-danaMed">{title}</h2>
        <div className="text-xs  flex items-center gap-x-1 text-gray-600 font-danaMed cursor-pointer">
          <span>مشاهده همه</span>
          <IoIosArrowRoundBack size={18} />
        </div>
      </div>
    </div>
  );
};

export default TopSubject;
