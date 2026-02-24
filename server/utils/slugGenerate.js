export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")     // remove special chars
    .replace(/\s+/g, "-");        // replace spaces with -
};


