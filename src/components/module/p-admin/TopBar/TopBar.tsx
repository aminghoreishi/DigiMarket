import { authAdmin } from "@/utils/auth";

async function TopBar({ title }: { title: string }) {
  const isAdmin = await authAdmin();

  console.log(isAdmin);

  return (
    <div className="font-danaMed  flex justify-between">
      <h2>{title}</h2>
      <div>
        <p className="text-xs text-zinc-500">
          سلام ،<span className="text-base text-black">{isAdmin.fullName}</span>
        </p>
      </div>
    </div>
  );
}

export default TopBar;
