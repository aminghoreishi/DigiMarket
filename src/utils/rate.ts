import db from "@/config/db";
import commentModel from "@/models/comment";

export async function getProductRating(productId: string) {
  await db();

  const comments = await commentModel
    .find({
      product: productId,
      isApproved: true,
    })
    .lean();

  const count = comments.length;

  if (count === 0) {
    return { rating: 0, ratingCount: 0 };
  }

  const positive = comments.filter((c) => c.isOk).length;

  return {
    rating: Number(((positive / count) * 5).toFixed(1)),
    ratingCount: count,
  };
}
