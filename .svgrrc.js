// .svgrrc.js

const path = require("path");

function defaultIndexTemplate(filePaths) {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
    return `export { default as Icon${exportName} } from './${basename}'`;
  });
  return exportEntries.join("\n");
}

const template = (variables, { tpl }) => {
  return tpl`
  ${variables.imports};

  ${variables.interfaces};

  const ${variables.componentName} = (${variables.props}) => (
    ${variables.jsx}
  );
  
  ${variables.exports};
`;
};

module.exports = {
  template: template,
  indexTemplate: defaultIndexTemplate,
  native: true,
  typescript: true,
};
