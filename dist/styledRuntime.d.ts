/// <reference types="react" />
/// <reference types="react" />
export declare function styledRuntime<T extends keyof JSX.IntrinsicElements>(el: T, className: string): {
    (props: React.ComponentProps<T>): import("react").DOMElement<import("react").ComponentProps<T> & {
        className: string;
    }, SVGViewElement>;
    displayName: string;
};
