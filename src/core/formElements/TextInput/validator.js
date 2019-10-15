export const validatorMap = {
  username: /^.+$/,
  address: /a-zA-Z\d\s-,#.\+]+/,
  zip: {
    pattern: /^\d{5,6}(?:[-\s]\d{4})?$/,
    help: value => {
      if (value) return;
    },
  },
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?\-&])[A-Za-z\d$@$!%*\-?&]{8,}/,
  phone: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
};

export const validator = (value, pattern) => {
  if (!pattern) return true;
  return pattern.test(value);
};

export const nonRegexValidator = (value, pattern) => {
  if (!pattern) return true;
  return pattern.test(value);
};
