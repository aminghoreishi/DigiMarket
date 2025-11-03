function TopBar({ title }: { title: string }) {
  return (
    <div className="font-danaMed  flex justify-between">
      <h2>{title}</h2>
      <div>
        <p className="text-xs text-zinc-500">سلام <span className="text-base text-black">امیر رضا کرمی</span></p>
      </div>
    </div>
  );
}

export default TopBar;
