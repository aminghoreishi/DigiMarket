const FEATURES = {
  "693928aace7a3b533d3f7eb7": {
    رم: "ramLap",
    حافظه: "storageLap",
    "اندازه صفحه نمایش": "screenSize",
    پردازنده: "cpu",
    گرافیک: "gpu",
    وزن: "weight",
  },
  "693929d9ce7a3b533d3f7f18": {
    "نوع آنتن": "kindAnten",
    "تعداد پورت RJ45": "rj45",
    "نوع شبکه": "networkType",
    فرکانس: "ferquency",
    کلیدها: "keys",
    وزن: "weight",
  },
};

export const getFeatures = (data: any, category: string) => {
  const map = FEATURES[category];
  if (!map) return [];

  const result: { name: string; value: string }[] = [];

  for (const [name, key] of Object.entries(map)) {
    const value = data[key];
    if (value && value !== "") {
      result.push({ name, value: value.toString() });
    }
  }

  return result;
};