"use client";
function BtnTop() {
  return (
    <>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-sm font-danaMed text-nowrap"
      >
        برو بالا
      </button>
    </>
  );
}

export default BtnTop;
