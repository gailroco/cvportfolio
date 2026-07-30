import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {
    ignores: [
      ".cache/",
      "public/",
      "node_modules/",
      "src/transition/",
    ],
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    files: ["gatsby-config.js"],
    languageOptions: { globals: globals.node },
  },
];