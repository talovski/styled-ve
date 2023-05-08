/// <reference types="react" />
/// <reference types="react" />
import type { PatternResult, VariantGroups } from './types';
export declare const createRuntimeFn: <Variants extends VariantGroups, T extends keyof JSX.IntrinsicElements>(config: PatternResult<Variants>, el: T) => {
    (props: import("react").ComponentProps<T>): import("react").DOMElement<import("react").ComponentProps<T> & {
        className: string;
    }, SVGViewElement>;
    displayName: string;
};
