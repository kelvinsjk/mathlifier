import "./style.css";
import { html } from "./demo.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = html;

import {
  math,
  display,
  align,
  alignStar,
  gather,
  gatherStar,
  equation,
  equationStar,
  eqn,
  eqnStar,
  alignat,
  alignatStar,
} from "./lib/sprinkles";

//https://tex.stackexchange.com/questions/49014/aligning-equations-with-text-with-alignat
document.querySelector<HTMLDivElement>("#legacy")!.innerHTML =
  `<h1>Legacy demo</h1>
<p>Inline math ${math(`x_0 = 5,`)} vs displayed ${display("y=ax^2+bx+c.")}</p>
<p>${align("x&=1\\\\y^3&=234")}</p>
<p>${alignStar("x&=1\\\\y^3&=234")}</p>
<p>${gather("x=1\\\\y^3=234")}</p>
<p>${gatherStar("x=1\\\\y^3=234")}</p>
<p>${equation("x=2")}</p>
<p>${equationStar("x=2")}</p>
<p>${eqn("x=2")}</p>
<p>${eqnStar("x=2")}</p>
<p>${alignat(
    `& m   \\quad && \\text{módulo}            \\quad && m>0\\\\
& a   \\quad && \\text{multiplicador}     \\quad && 0<a<m\\\\
& c   \\quad && \\text{constante aditiva} \\quad && 0\\leq c<m\\\\
& x_0 \\quad && \\text{valor inicial}     \\quad && 0\\leq x_0 <m`,
    3
  )}</p>
<p>${alignatStar(
    `& m   \\quad && \\text{módulo}            \\quad && m>0\\\\
& a   \\quad && \\text{multiplicador}     \\quad && 0<a<m\\\\
& c   \\quad && \\text{constante aditiva} \\quad && 0\\leq c<m\\\\
& x_0 \\quad && \\text{valor inicial}     \\quad && 0\\leq x_0 <m`,
    3
  )}</p>

`;
