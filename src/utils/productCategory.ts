const FEATURES = {
  "6912c239c714dc8badfdbe30": {
    رم: "ramLap",
    حافظه: "storageLap",
    "اندازه صفحه نمایش": "screenSize",
    پردازنده: "cpu",
    گرافیک: "gpu",
    وزن: "weight",
  },
  "69138a02f035aa5cee9e73bd": {
    "نوع آنتن": "kindAnten",
    "تعداد پورت RJ45": "rj45",
    "نوع شبکه": "networkType",
    'فرکانس': "ferquency",
    'کلیدها': "keys",
    'وزن': "weight",
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
