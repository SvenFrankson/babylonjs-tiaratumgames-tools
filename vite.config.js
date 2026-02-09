import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/babylonjs-geometry-kit.ts"),
            name: "BabylonJS Geometry Kit",
            // the proper extensions will be added
            fileName: "babylonjs-geometry-kit",
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ["@babylonjs/core"],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    "@babylonjs/core": "BABYLON",
                },
            },
        },
    },
    plugins: [dts()],
});
