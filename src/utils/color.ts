const faToEn: Record<string, string> = {
  "خاکستری": "gray",
  "مشکی": "black",
  "سفید": "white",
  "ابی": "blue",
  "قرمز": "red",
  "سبز": "green",
};

const enToFa: Record<string, string> = {
  gray: "خاکستری",
  black: "مشکی",
  white: "سفید",
  blue: "آبی",
  red: "قرمز",
  green: "سبز",
};

// فقط برای نمایش فارسی
export const toPersian = (en: string) => enToFa[en.toLowerCase()] || en;

// فقط برای تبدیل به انگلیسی (همیشه!)
export const toEnglish = (input: string): string => {
  const lower = input.toLowerCase().trim();
  return faToEn[lower] || enToFa[lower] || lower;
};