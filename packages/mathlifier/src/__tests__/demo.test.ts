import { expect, it } from "vitest";
import { html, xDj } from "../demo";
import fs from "fs";
import { exec } from "child_process";

it("demo works", () => {
  expect(html).toMatchSnapshot();
});

it("x demo works", () => {
  expect(xDj).toMatchSnapshot();
  fs.writeFileSync("./src/output/x.dj", xDj);
  exec(
    "djot -t pandoc ./src/output/x.dj | pandoc -f json -s -t pdf -o ./src/output/x.pdf"
  );
  exec(
    "djot -t pandoc ./src/output/x.dj | pandoc -f json -s -t latex -o ./src/output/x.tex"
  );
  const tex = fs.readFileSync("./src/output/x.tex", "utf-8");
  expect(tex).toMatchSnapshot();
});
