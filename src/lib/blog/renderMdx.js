import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

export async function compileMdxContent(source) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    development: process.env.NODE_ENV === "development",
  });
  return Content;
}
