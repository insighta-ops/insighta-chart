import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react']
    }),
    peerDepsExternal(),
    resolve(),
    commonjs()
  ],
  external: ['react', 'react-dom', 'axios', 'react-chartjs-2', 'chart.js']
};

