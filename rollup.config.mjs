import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";
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
  ].filter(Boolean),
};
