import Validator from "fastest-validator";

const v = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    stringMin:
      "The '{field}' field must be at least {expected} characters long.",
    stringMax: "The '{field}' field cannot exceed {expected} characters.",
    stringPattern: "The '{field}' field has an invalid format.",
    stringEmpty: "The '{field}' field cannot be empty.",
  },
});

const subLinkSchema = {
  title: {
    type: "string",
    min: 2,
    max: 50,
    trim: true,
  },

  href: {
    type: "string",
    min: 1,
    max: 100,
    pattern: /^\/[a-zA-Z0-9\-\/]*$/,
    messages: {
      stringPattern:
        "The 'href' must start with '/' and contain only letters, numbers, '-', and '/'.",
    },
  },

  parentLinkId: {
    type: "string",
    optional: true,
    empty: false,
    pattern: /^[0-9a-fA-F]{24}$/,
    messages: {
      stringPattern:
        "The 'parentLinkId' must be a valid 24-character MongoDB ObjectId.",
      stringEmpty: "The 'parentLinkId' cannot be an empty string.",
    },
  },
};

const checkSubLink = v.compile(subLinkSchema);

export default checkSubLink;
