module.exports = (variables, { tpl }) => {
  const { componentName, jsx } = variables;

  return tpl`
    import { SVGProps } from "react";

    const ${componentName} = (props: SVGProps<SVGSVGElement>) => ${jsx};

    export default ${componentName};
  `;
};