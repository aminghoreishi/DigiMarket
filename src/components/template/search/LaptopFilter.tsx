import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function LaptopFilter() {
  const [ram, setRam] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (ram) {
      params.set("ram", ram);
    } else {
      params.delete("ram");
    }
    router.push(`?${params.toString()}`);
  }, [ram]);
  return (
    <div>
      <div className="flex items-center">
        <label className="inline-flex items-center">رم:</label>
        <select
          onChange={(e) => setRam(e.target.value)}
          className="mr-2 border w-full p-2 outline-0 border-zinc-300 rounded-lg"
        >
          <option>انتخاب کنید</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={32}>32</option>
          <option value={64}>64</option>
        </select>
      </div>
    </div>
  );
}

export default LaptopFilter;
