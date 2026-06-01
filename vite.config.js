import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/babylonjs-tiaratumgames-tools.ts"),
            name: "BabylonJS Tiaratum Games Tools",
            // the proper extensions will be added
            fileName: "babylonjs-tiaratumgames-tools",
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [/^@babylonjs\//],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    "@babylonjs/core": "BABYLON",
                    "@babylonjs/core/Buffers/buffer": "_babylonjs_core_Buffers_buffer",
                    "@babylonjs/core/Culling/ray": "_babylonjs_core_Culling_ray",
                    "@babylonjs/core/Engines/engine": "_babylonjs_core_Engines_engine",
                    "@babylonjs/core/Loading/sceneLoader": "_babylonjs_core_Loading_sceneLoader",
                    "@babylonjs/core/Materials/PBR/pbrMaterial": "_babylonjs_core_Materials_PBR_pbrMaterial",
                    "@babylonjs/core/Maths/math.axis": "_babylonjs_core_Maths_math_axis",
                    "@babylonjs/core/Maths/math.color": "_babylonjs_core_Maths_math_color",
                    "@babylonjs/core/Maths/math.plane": "_babylonjs_core_Maths_math_plane",
                    "@babylonjs/core/Maths/math.vector": "_babylonjs_core_Maths_math_vector",
                    "@babylonjs/core/Meshes/abstractMesh": "_babylonjs_core_Meshes_abstractMesh",
                    "@babylonjs/core/Meshes/mesh": "_babylonjs_core_Meshes_mesh",
                    "@babylonjs/core/Meshes/mesh.vertexData": "_babylonjs_core_Meshes_mesh_vertexData",
                    "@babylonjs/core/Meshes/meshBuilder": "_babylonjs_core_Meshes_meshBuilder",
                    "@babylonjs/core/Meshes/transformNode": "_babylonjs_core_Meshes_transformNode",
                    "@babylonjs/loaders": "BABYLONLOADERS",
                    "@babylonjs/loaders/dynamic": "BABYLONLOADERS",
                },
            },
        },
    },
    plugins: [dts()],
});
