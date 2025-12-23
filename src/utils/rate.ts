import commentModel from "@/models/comment";

export const rateFunc = async (products: any[]) => {
  const rate = await Promise.all(
    products.map(async (p: any) => {
      const comments = await commentModel
        .find({
          product: p._id,
          isApproved: true,
        })
        .lean();

      const totalCount = comments.length;

      if (totalCount === 0) {
        return {
          productId: p._id.toString(),
          rating: 0,
          ratingCount: 0,
        };
      }

      const positiveCount = comments.filter((c) => c.isOk).length;

      return {
        productId: p._id.toString(),
        rating: Number(((positiveCount / totalCount) * 5).toFixed(1)),
        ratingCount: totalCount,
      };
    })
  );

  return rate;
};


