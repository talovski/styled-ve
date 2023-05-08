/// <reference types="react" />
import type { PatternResult, VariantGroups } from './types';
export declare const recipeRuntime: <Variants extends VariantGroups, T extends keyof JSX.IntrinsicElements>(config: PatternResult<Variants>, el: T) => import("react").ForwardRefExoticComponent<import("react").RefAttributes<unknown>>;
