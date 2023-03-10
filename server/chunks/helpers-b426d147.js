const serializeNonPOJOs = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
const convertMessagesFromPocketBase = (err) => {
  for (const key in err.response.data) {
    err.response.data[key] = [err.response.data[key].message];
  }
  return err.response.data;
};
const parseDateFromInput = (date) => {
  date = date.replace(" ", "T");
  date = date + ":00Z";
  return date;
};
const checkPermissions = (requiredPermissions, user) => {
  if (!user)
    return false;
  if (user.permissions?.admin)
    return true;
  const userPermissions = Object.keys(user.permissions || {});
  return requiredPermissions.every((permission) => userPermissions.includes(permission));
};

export { convertMessagesFromPocketBase as a, checkPermissions as c, parseDateFromInput as p, serializeNonPOJOs as s };
//# sourceMappingURL=helpers-b426d147.js.map
