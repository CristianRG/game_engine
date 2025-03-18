import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";

export default {
    input: "src/index.ts",
    output: {
        dir: "src/dist",
        format: "es"
    },
    plugins: [
        resolve({
            extensions: [".ts", ".js"]
        }),
        typescript({
            tsconfig: "./tsconfig.json"
        })
    ]
}