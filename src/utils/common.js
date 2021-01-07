export const pick = (object, keys) => {
  if (!keys) return object;
  return keys.reduce((obj, key) => {
    if (object && key in object) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
