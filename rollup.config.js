import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default {
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.js",
            format: "es",
            sourcemap: true
        },
        {
            file: "dist/index.min.js",
            format: "es",
            sourcemap: true,
            plugins: [
                terser({
                    compress: {
                        drop_console: true
                    },
                    format: {
                        comments: false
                    }
                })
            ]
        }
    ],
    plugins: [
        resolve({
            extensions: [".ts", ".js"]
        }),
        typescript({
            tsconfig: "./tsconfig.json"
        }),
    ]
}