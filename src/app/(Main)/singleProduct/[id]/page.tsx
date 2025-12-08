import "@/models/comment";
import productModel from "@/models/product";
import Footer from "@/components/module/Footer/Footer";
import BredCrumbs from "@/components/template/SingleProduct/BreadCrumbs/BredCrumbs";
import Cart from "@/components/template/SingleProduct/Cart/Cart";
import Info from "@/components/template/SingleProduct/Info/Info";
import MainContainer from "@/components/template/SingleProduct/MainContainer/MainContainer";
import SwiperImage from "@/components/template/SingleProduct/SwiperImage/SwiperImage";
import { authUser } from "@/utils/auth";
import { memo } from "react";
import db from "@/config/db";

async function page({ params }: { params: Promise<{ id: string }> }) {
  await db();
  const user = await authUser();
  const isLoggedIn = !!user.user;
  const { id } = await params;
  const findProduct = await productModel.findOne({ _id: id }).lean();

  return (
    <>
      <div className="container mx-auto">
        <div className="grid xl:grid-cols-12 gap-5 mt-5">
          <div className="xl:col-span-9">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <SwiperMemo findProduct={findProduct} />
              </div>
              <div className="">
                <BredCrumbs />
                <Info
                  features={findProduct.features}
                  findProductID={findProduct._id}
                  title={findProduct.title}
                  name={findProduct.name}
                />
              </div>
            </div>
          </div>
          <CartContainer
            isLoggedIn={isLoggedIn}
            price={findProduct.price}
            userID={user?.user?._id}
            colors={findProduct.colors}
            count={findProduct.count}
            delivery={findProduct.delivery}
            name={findProduct.name}
            id={findProduct._id.toString()}
            img={findProduct.images[0] || findProduct.images[1]}
          />
        </div>

        <div className="mt-8">
          <MainContainer
            isLoggedIn={isLoggedIn}
            userID={user?.user?._id}
            tags={JSON.parse(JSON.stringify(findProduct.tags))}
            findProductID={findProduct._id}
            features={JSON.parse(JSON.stringify(findProduct.features))}
            longDescription={findProduct.longDescription}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

const CartContainer = memo(
  ({ isLoggedIn, price, colors, count, delivery, name, id, img, userID }) => {
    return (
      <div className=" xl:col-span-3">
        <Cart
          isLoggedIn={isLoggedIn}
          price={price}
          colors={colors}
          count={count}
          delivery={delivery}
          name={name}
          userID={userID}
          id={id}
          img={img}
        />
      </div>
    );
  }
);

const SwiperMemo = memo(({ findProduct }) => {
  return (
    <div>
      <SwiperImage
        images={findProduct.images}
        id={findProduct._id.toString()}
      />
    </div>
  );
});

export default page;
