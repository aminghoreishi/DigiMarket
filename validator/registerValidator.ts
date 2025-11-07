import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  fullName: {
    type: "string",
    min: 3,
    max: 30,
    pattern: /^[\u0600-\u06FFa-zA-Z\s]+$/,
    messages: {
      stringPattern: "نام باید فقط شامل حروف فارسی یا انگلیسی باشد",
      stringMin: "نام باید حداقل ۳ کاراکتر باشد",
      stringMax: "نام نمی‌تواند بیش از ۳۰ کاراکتر باشد",
      string: "نام معتبر نیست",
    },
  },
  email: {
    type: "email",
    messages: {
      email: "ایمیل معتبر نیست",
      required: "ایمیل الزامی است",
    },
  },
  password: {
    type: "string",
    min: 8,
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
    messages: {
      stringMin: "رمز عبور باید حداقل ۸ کاراکتر باشد",
      stringPattern: "رمز باید شامل حرف و عدد باشد",
    },
  },
};

export const validateRegister = v.compile(schema);
