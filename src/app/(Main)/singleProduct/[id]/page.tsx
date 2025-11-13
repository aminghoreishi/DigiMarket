import "@/models/comment";
import productModel from "@/models/product";
import Footer from "@/components/module/Footer/Footer";
import BredCrumbs from "@/components/template/SingleProduct/BreadCrumbs/BredCrumbs";
import Cart from "@/components/template/SingleProduct/Cart/Cart";
import Info from "@/components/template/SingleProduct/Info/Info";
import MainContainer from "@/components/template/SingleProduct/MainContainer/MainContainer";
import SwiperImage from "@/components/template/SingleProduct/SwiperImage/SwiperImage";
import { authUser } from "@/utils/auth";
import commentModel from "@/models/comment";

type findProductType = {
  _id: string;
  images: string[];
  price: number;
  count: number;
  delivery: boolean;
};

async function page({ params }: { params: Promise<{ id: string }> }) {
  const user = await authUser();
  const isLoggedIn = !!user.user;
  const { id } = await params;

  console.log(id);

  const findProduct = await productModel.findOne({ _id: id }).lean();

  console.log(findProduct);
  



  return (
    <>
      <div className="container mx-auto">
        <div className="grid xl:grid-cols-12 gap-5 mt-5">
          <div className="xl:col-span-9">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <div>
                  <SwiperImage images={findProduct.images} />
                </div>
              </div>
              <div className="">
                <BredCrumbs />
                <Info features={findProduct.features} />
              </div>
            </div>
          </div>
          <div className="  xl:col-span-3">
            <Cart
              isLoggedIn={isLoggedIn}
              price={findProduct.price}
              count={findProduct.count}
              delivery={findProduct.delivery}
              name={findProduct.title}
              id={findProduct._id}
              img={findProduct.images[0]|| findProduct.images[1]}
            />
          </div>
        </div>

        <div className="mt-8">
          <MainContainer
            isLoggedIn={isLoggedIn}
            userID={user?.user?._id}
            findProductID={findProduct._id}
            longDescription={findProduct.longDescription}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;
