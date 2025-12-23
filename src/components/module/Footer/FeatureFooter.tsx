import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  title: string;
  description: string;
};

function FeatureFooter({ icon: Icon, title, description }: Props) {
  return (
    <div className="border-2 border-zinc-200 rounded-3xl px-8">
      <div className="flex items-center justify-center gap-1 font-danaMed text-xs">
        <Icon size={40} className="m-4 text-red-600" />
        <div className="flex flex-col gap-1">
          <p>{title}</p>
          <p className="text-zinc-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default FeatureFooter;
