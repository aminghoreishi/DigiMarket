// app/api/subLink/route.ts
import db from "@/config/db";
import linkModel from "@/models/link";
import subLinkModel from "@/models/subLink";

export async function POST(request: Request) {
  await db();
  const { title, href, parentLinkId, parentSubLinkId } = await request.json();

  const newSubLink = await subLinkModel.create({
    title,
    href,
    parentLink: parentLinkId || null,
    parentSubLink: parentSubLinkId || null,
  });

  // به children والد اضافه کن
  if (parentSubLinkId) {
    await subLinkModel.findByIdAndUpdate(parentSubLinkId, {
      $push: { children: newSubLink._id },
    });
  } else if (parentLinkId) {
    await linkModel.findByIdAndUpdate(parentLinkId, {
      $push: { subLink: newSubLink._id },
    });
  }

  return Response.json(newSubLink, { status: 201 });
}
