module.exports = {
  ...require("./node_modules/gts/.prettierrc.json"),
  ...{
    bracketSpacing: true,
    singleQuote: true,
    semi: true,
    printWidth: 140,
    trailingComma: 'none',
    tabWidth: 2,
    useTabs: false,
    endOfLine: 'auto',
    vueIndentScriptAndStyle: true
  }
};
