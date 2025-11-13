const FEATURES = {
  "6912c239c714dc8badfdbe30": {
    رم: "ramLap",
    حافظه: "storageLap",
    "اندازه صفحه نمایش": "screenSize",
    پردازنده: "cpu",
    گرافیک: "gpu",
    وزن: "weight",
  },
  "690b39962d29378e5b3d6194": {
    رم: "ram",
    حافظه: "storage",
    "اندازه صفحه نمایش": "screenSize",
    چیپست: "chipset",
    "سیستم عامل": "os",
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
