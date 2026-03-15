import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import pkg from "./package.json" with { type: "json" };

const dev = process.env.ROLLUP_WATCH;

export default {
  input: "src/equitherm-cards.ts",
  output: {
    file: "dist/equitherm-cards.js",
    format: "es",
    inlineDynamicImports: true,
    sourcemap: !!dev,
  },
  plugins: [
    replace({
      preventAssignment: true,
      __VERSION__: pkg.version,
    }),
    resolve({ browser: true }),
    commonjs(),
    typescript(),
    !dev && terser(),
    dev &&
      serve({
        contentBase: ["dist"],
        host: "0.0.0.0",
        port: 4000,
        headers: { "Access-Control-Allow-Origin": "*" },
      }),
  ].filter(Boolean),
};
