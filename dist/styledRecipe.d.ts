/// <reference types="react" />
import type { PatternOptions, VariantGroups } from './types';
export type { RecipeVariants, RuntimeFn } from './types';
export declare function recipe<T extends keyof JSX.IntrinsicElements, Variants extends VariantGroups>(options: PatternOptions<Variants>, el: T, debugId?: string): import("react").ForwardRefExoticComponent<import("react").RefAttributes<unknown>>;
