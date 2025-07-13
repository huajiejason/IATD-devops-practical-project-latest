import globals from "globals";
import js from "@eslint/js";


export default [
  {
    languageOptions: { 
      globals: globals.node 
    },
  },
  {
    ignores: ["tests/"]
  },
  js.configs.recommended,
];