export const isEmptyObj = (obj) => {
  if (obj) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      return true;
    }
    return false;
  }

  return false;
};
