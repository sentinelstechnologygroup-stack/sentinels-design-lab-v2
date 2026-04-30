import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "src/**",
      "pages/services/**",
      "pages/StartProject.jsx",
      "pages/Reviews.jsx",
      "pages/Roi.jsx",
      "pages/ROICalculator.jsx",
      "pages/ComboPackages.jsx",
      "components/roi/**",
      "pages/ProjectDetail.jsx",
      "pages/BlogPost.jsx"
    ],
  },
  {
    files: ["app/**/*.{js,jsx}", "components/**/*.{js,jsx}", "hooks/**/*.{js,jsx}", "lib/**/*.{js,jsx}", "pages/**/*.{js,jsx}"],
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
    },
    rules: {
      "no-unused-vars": "off",
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
    },
  },
];
