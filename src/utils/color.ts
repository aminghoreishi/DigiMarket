// utils/color.ts
const faToEn: Record<string, string> = {
  خاکستری: "gray",
  "نقره ای": "gray",
  "نقره‌ای": "gray",     // با و بدون فاصله
  مشکی: "black",
  سفید: "white",
  آبی: "blue",
  ابی: "blue",            // غلط املایی رایج
  قرمز: "red",
  سبز: "green",
  زرد: "yellow",
  نارنجی: "orange",
  بنفش: "purple",
  صورتی: "pink",
  طلایی: "yellow",
  "قهوه ای": "brown",
  "قهوه‌ای": "brown",
};

const enToFa: Record<string, string> = {
  gray: "خاکستری",
  silver: "نقره‌ای",
  black: "مشکی",
  white: "سفید",
  blue: "آبی",
  red: "قرمز",
  green: "سبز",
  yellow: "زرد",
  orange: "نارنجی",
  purple: "بنفش",
  pink: "صورتی",
  brown: "قهوه‌ای",
};

export const toPersian = (en: string): string => {
  return enToFa[en.toLowerCase()] || en;
};

export const toEnglish = (input: string): string => {
  const cleaned = input.trim();

  // اول مستقیم توی faToEn چک کن
  if (faToEn[cleaned]) {
    return faToEn[cleaned];
  }

  // اگر نبود، شاید کاربر انگلیسی نوشته
  const lower = cleaned.toLowerCase();
  if (enToFa[lower]) {
    // اگر انگلیسی بود، کلید معکوس رو برگردون
    const found = Object.entries(enToFa).find(
      ([_, fa]) => fa === cleaned || fa.replace("ی", "ي") === cleaned
    );
    if (found) return found[0]; // مثلاً "gray"
  }

  // آخرین راه: اگر هیچی نبود، خود رشته رو برگردون (مثلاً برای hex)
  return lower;
};