// app/api/menu/route.ts
import db from "@/config/db";
import MenuItem from "@/models/MenuItem";

export async function POST(request: Request) {
  await db();
  const { title, href, parentId } = await request.json();

  const newItem = await MenuItem.create({
    title,
    href,
    parent: parentId || null,
  });

  // اگر parent داره، به children اضافه کن
  if (parentId) {
    await MenuItem.findByIdAndUpdate(parentId, {
      $push: { children: newItem._id },
    });
  }

  return Response.json(newItem, { status: 201 });
}