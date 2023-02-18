module.exports = {
  extends: ["react-app", "prettier"],
  rules: {
    "import/namespace": "off",
    "import/no-unresolved": "off",
    "import/order": [
      "warn",
      {
        "alphabetize": {
          order: "asc",
          caseInsensitive: true,
        },
        "groups": [
          ["builtin", "external"],
          "internal",
          ["sibling", "parent", "index"],
          "object",
        ],
        "newlines-between": "always",
        "pathGroupsExcludedImportTypes": ["builtin"],
      },
    ],
    "react/display-name": "off",
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never" },
    ],
    "react/jsx-fragments": ["error", "element"],
    "react/jsx-handler-names": ["warn"],
    "react/jsx-no-useless-fragment": ["error"],
    "react/jsx-sort-props": ["error"],
    "react/prop-types": "off",
  },
};
