import ky from "ky";

// React query turns the date object into a string; while ky turns the string back to a date object
const kyInstance = ky.create({
  parseJson: (text) =>
    JSON.parse(text, (key, value) => {
      if (key.endsWith("At")) return new Date(value);
      return value;
    }),
});
export default kyInstance;
