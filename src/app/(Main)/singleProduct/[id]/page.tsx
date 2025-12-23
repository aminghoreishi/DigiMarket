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
import commentModel from "@/models/comment";

type Product = {
  _id: string;
  title: string;
  name: string;
  price: number;
  images: string[];
  colors: string[];
  count: number;
  delivery: boolean;
  tags: string[];
  features: any[];
  longDescription: string;
};
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  await db();

  const product = await productModel
    .findOne({ _id: params.id })
    .select("title name longDescription images tags")
    .lean<{
      title: string;
      name: string;
      longDescription: string;
      images: string[];
      tags: string[];
    }>();

  if (!product) {
    return {
      title: "محصول پیدا نشد",
      description: "محصول مورد نظر وجود ندارد",
    };
  }

  const description =
    product.longDescription?.slice(0, 160) ||
    `خرید ${product.title} با بهترین قیمت`;

  return {
    title: `${product.title} | خرید ${product.title}`,
    description,
  };
}

async function page({ params }: { params: { id: string } }) {
  await db();

  const user = await authUser();
  const isLoggedIn = !!user?.user;
  const { id } = params;

  const findProduct = await productModel.findOne({ _id: id }).lean<Product>();

  const findsComment = await commentModel
    .find({ product: findProduct?._id })
    .lean();

  const positiveCount = findsComment.filter((c) => c.isOk).length;

  const rateCalculate = Number(
    ((positiveCount / findsComment.length) * 5).toFixed(1)
  );

  if (!findProduct) return null;

  return (
    <>
      <div className="container mx-auto">
        <div className="grid xl:grid-cols-12 gap-5 mt-5">
          <div className="xl:col-span-9">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <SwiperMemo findProduct={findProduct} />
              <div>
                <BredCrumbs slugBrec={findProduct.slugBrec} />
                <Info
                  features={findProduct.features.slice(0, 6)}
                  findProductID={findProduct._id}
                  title={findProduct.title}
                  name={findProduct.name}
                  rateCount={positiveCount.toString()}
                  rateCalculate={rateCalculate}
                />
              </div>
            </div>
          </div>

          <CartContainer
            isLoggedIn={isLoggedIn}
            price={findProduct.price}
            colors={findProduct.colors}
            count={findProduct.count}
            delivery={findProduct.delivery}
            name={findProduct.name}
            id={findProduct._id}
            img={findProduct.images[0] || findProduct.images[1]}
            userID={user?.user?._id}
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

type CartContainerProps = {
  isLoggedIn: boolean;
  price: number;
  colors: string[];
  count: number;
  delivery: boolean;
  name: string;
  id: string;
  img: string;
  userID?: string;
};

const CartContainer = memo<CartContainerProps>(
  ({ isLoggedIn, price, colors, count, delivery, name, id, img, userID }) => {
    return (
      <div className="xl:col-span-3">
        <Cart
          isLoggedIn={isLoggedIn}
          price={price}
          colors={colors}
          count={count}
          delivery={delivery}
          name={name}
          userID={userID}
          id={id.toString()}
          img={img}
        />
      </div>
    );
  }
);

CartContainer.displayName = "CartContainer";

type SwiperMemoProps = {
  findProduct: Pick<Product, "_id" | "images">;
};

const SwiperMemo = memo<SwiperMemoProps>(({ findProduct }) => {
  return (
    <SwiperImage images={findProduct.images} id={findProduct._id.toString()} />
  );
});

SwiperMemo.displayName = "SwiperMemo";

export default page;
