function Feature({ feature }) {
  return (
    <div className="bg-gray-100 rounded-xl p-2  font-danaMed">
      <p className="text-sm max-sm:text-xs line-clamp-1 text-zinc-500">{feature.name}:</p>
      <p className="text-sm max-sm:text-xs ss02 line-clamp-1">
        {feature.value}
      </p>
    </div>
  );
}

export default Feature;
