import * as jalaali from "jalaali-js";

export const getDaysAgo = (createdAt: string): string => {
  const commentDate = new Date(createdAt);
  const today = new Date();

  const cj = jalaali.toJalaali(commentDate);
  const tj = jalaali.toJalaali(today);

  const commentJalaliDate = new Date(cj.jy, cj.jm - 1, cj.jd);
  const todayJalaliDate = new Date(tj.jy, tj.jm - 1, tj.jd);

  const diffMs = todayJalaliDate.getTime() - commentJalaliDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const formatJalali = (j: typeof cj) =>
    `${j.jy}/${String(j.jm).padStart(2, "0")}/${String(j.jd).padStart(2, "0")}`;

  if (diffDays === 0) {
    return `امروز ${formatJalali(cj)}`; // فقط string
  }

  if (diffDays === 1) {
    return `${formatJalali(cj)} دیروز`;
  }

  if (diffDays < 7) {
    return `${diffDays} روز پیش`;
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} هفته پیش`;
  }

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ماه پیش`;
  }

  const years = Math.floor(diffDays / 365);
  return `${years} سال پیش`;
};