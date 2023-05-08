import { styledRuntime } from "./styledRuntime";
import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import { ComplexStyleRule, style } from "@vanilla-extract/css";
export { recipe } from "./styledRecipe";
export { recipeRuntime } from "./recipeRuntime";

export function styled<T extends keyof JSX.IntrinsicElements>(
  el: T,
  rules: ComplexStyleRule
) {
  const className = style(rules);
  const args = [el, className] as const;

  const Component = styledRuntime(el, className);

  addFunctionSerializer(Component, {
    importPath: "styled-ve/styledRuntime",
    importName: "styledRuntime",
    args: args as any,
  });

  return Component;
}
