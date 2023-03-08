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

export { convertMessagesFromPocketBase as c, parseDateFromInput as p, serializeNonPOJOs as s };
//# sourceMappingURL=helpers-ba8b6484.js.map
