import { jsonParse } from "./json-parse";

export const parseRequest = (event) => {
  const { body } = event;
  if (!body) return undefined;
  return jsonParse(body);
};
