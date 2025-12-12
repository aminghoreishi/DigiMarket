import FormBrand from "./FormBrand";
import Table from "./Table";
function ContainerBrand({brands}: {brands?: any}) {
  return (
    <div>
      <div>
        <FormBrand />
      </div>
      <div className="mt-8">
      <Table brands={brands} />
      </div>
    </div>
  );
}

export default ContainerBrand;
