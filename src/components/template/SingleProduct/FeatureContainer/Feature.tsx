function Feature({ feature }) {
  return (
    <div className="bg-gray-100 rounded-xl p-2  font-danaMed">
      <p className="text-sm text-zinc-500">{feature.name}:</p>
      <p className="text-sm ss02">{feature.value}</p>
    </div>
  );
}

export default Feature;
