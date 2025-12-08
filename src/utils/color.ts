const faToEn: Record<string, string> = {
  "خاکستری": "gray",
  "مشکی": "black",
  "سفید": "white",
  "ابی": "blue",
  "قرمز": "red",
  "سبز": "green",
  "نقره ای" : "gray"
 
  
};

const enToFa: Record<string, string> = {
  "gray": "نقره ای",
  "black": "مشکی",
  "white": "سفید",
  "blue": "آبی",
  "red": "قرمز",
  "green": "سبز",
};

export const toPersian = (en: string) => enToFa[en.toLowerCase()] || en;

export const toEnglish = (input: string): string => {
  const lower = input.toLowerCase().trim();
  return faToEn[lower] || enToFa[lower] || lower;
};
