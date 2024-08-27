import { expect, it } from "vitest";
import { html } from "./demo";

it("demo works", () => {
  expect(html).toMatchSnapshot();
});
