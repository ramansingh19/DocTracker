const pick = (object, keys) =>
  keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(object, key) && object[key] !== undefined) {
      acc[key] = object[key];
    }
    return acc;
  }, {});

export default pick;

