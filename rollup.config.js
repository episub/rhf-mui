import ts from '@wessberg/rollup-plugin-ts'
import external from 'rollup-plugin-auto-external'
import pkg from './package.json'

const rollupConifg = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [external(), ts()],
  external: [/autosuggest-highlight/],
}

export default rollupConifg
