import { defineConfig } from 'vite'
import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from "vite-plugin-mock";

const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

const alias: Record<string, string> = {
  "/@": pathResolve("src"),
  "@build": pathResolve("build")
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    resolve: {
      alias
    },
    plugins: [vue(), viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
      prodEnabled: command !== "serve" && true,
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
      logger: true
    }),]
  }
})
