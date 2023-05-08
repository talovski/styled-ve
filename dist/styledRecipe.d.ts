/// <reference types="react" />
/// <reference types="react" />
import type { PatternOptions, VariantGroups } from './types';
export type { RecipeVariants, RuntimeFn } from './types';
<<<<<<< HEAD
export declare function recipe<T extends keyof JSX.IntrinsicElements, Variants extends VariantGroups>(options: PatternOptions<Variants>, el: T, debugId?: string): {
=======
export declare function styledRecipe<T extends keyof JSX.IntrinsicElements, Variants extends VariantGroups>(options: PatternOptions<Variants>, el: T, debugId?: string): {
>>>>>>> origin/main
    (props: import("react").ComponentProps<T>): import("react").DOMElement<import("react").ComponentProps<T> & {
        className: string;
    }, SVGViewElement>;
    displayName: string;
};
