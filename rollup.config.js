import ts from "@wessberg/rollup-plugin-ts";
import packageJson from "./package.json";
import {builtinModules} from "module";

export default {
	input: "src/index.ts",
	preserveEntrySignatures: true,
	output: [
		{
			file: packageJson.main,
			format: "cjs",
			sourcemap: true,
			exports: "named"
		},
		{
			file: packageJson.module,
			format: "esm",
			sourcemap: true,
			exports: "named"
		}
	],
	plugins: [
		ts({
			tsconfig: "tsconfig.build.json"
		})
	],
	external: [
		...builtinModules,
		...Object.keys(packageJson.dependencies ?? {}),
		...Object.keys(packageJson.devDependencies ?? {}),
		...Object.keys(packageJson.peerDependencies ?? {})
	]
};
