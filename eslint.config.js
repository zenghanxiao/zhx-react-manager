import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { globalIgnores } from "eslint/config"
// 添加Prettier导入
import prettier from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      // 添加Prettier配置
      prettierConfig,
      prettier.configs.recommended,
    ],
    // 添加Prettier插件
    plugins: {
      ...reactHooks.plugins,
      ...reactRefresh.plugins,
      prettier,
    },
    // 添加Prettier规则
    rules: {
      "prettier/prettier": "error",
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
