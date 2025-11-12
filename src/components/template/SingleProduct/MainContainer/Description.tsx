function Description({ longDescription }: { longDescription: string }) {
  return (
    <div className="font-danaMed">
      <h2 className="max-sm:text-sm">توضیحات این محصول</h2>
      <p className="max-sm:text-xs text-sm my-5">{longDescription}</p>
    </div>
  );
}

export default Description;
