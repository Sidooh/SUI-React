import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';

const packageJson = require('./package.json');

export default [
    {
        input: 'src/index.ts',
        output: [
            { file: packageJson.main, format: 'cjs', sourcemap: true },
            { file: packageJson.module, format: 'esm', sourcemap: true },
        ],
        plugins: [
            babel({
                babelHelpers: 'bundled',
                presets: ['@babel/preset-react'],
                exclude: 'node_modules/**',
            }),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json', }),
            peerDepsExternal(),
            terser(),
            postcss(),
            image({ dom: true, include: [/\.(png|jpg|svg)$/] }),
        ]
    }, {
        input: 'dist/esm/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
        external: [/\.(css|less|scss)$/],
    }
];