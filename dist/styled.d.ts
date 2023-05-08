/// <reference types="react" />
/// <reference types="react" />
import { ComplexStyleRule } from "@vanilla-extract/css";
export { recipe } from "./styledRecipe";
export { recipeRuntime } from "./recipeRuntime";
export declare function styled<T extends keyof JSX.IntrinsicElements>(el: T, rules: ComplexStyleRule): {
    (props: import("react").ComponentProps<T>): import("react").DOMElement<import("react").ComponentProps<T> & {
        className: string;
    }, SVGViewElement>;
    displayName: string;
};
