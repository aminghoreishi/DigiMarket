import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ModemFilter() {
  const [numberAnt, setNumberAnt] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (numberAnt) {
      params.set("numberAnt", numberAnt);
    } else {
      params.delete("numberAnt");
    }
    window.dispatchEvent(new CustomEvent("nextjs-route-change-start"));
    router.push(`?${params.toString()}`);
  }, [numberAnt]);
  return (
    <div>
      <div className="flex items-center">
        <label className="inline-flex items-center">تعداد آنتن:</label>
        <select
          onChange={(e) => setNumberAnt(e.target.value)}
          className="mr-2 border w-full p-2 outline-0 border-zinc-300 rounded-lg"
        >
          <option>انتخاب کنید</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
      </div>
    </div>
  );
}

export default ModemFilter;
