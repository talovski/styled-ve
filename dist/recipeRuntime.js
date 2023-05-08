"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRuntime = void 0;
const react_1 = require("react");
const shouldApplyCompound = (compoundCheck, selections, defaultVariants) => {
    var _a;
    for (const key of Object.keys(compoundCheck)) {
        if (compoundCheck[key] !== ((_a = selections[key]) !== null && _a !== void 0 ? _a : defaultVariants[key])) {
            return false;
        }
    }
    return true;
};
const recipeRuntime = (config, el) => {
    const runtimeFn = (options) => {
        var _a;
        let className = config.defaultClassName;
        const selections = Object.assign(Object.assign({}, config.defaultVariants), options);
        for (const variantName in selections) {
            const variantSelection = (_a = selections[variantName]) !== null && _a !== void 0 ? _a : config.defaultVariants[variantName];
            if (variantSelection != null) {
                let selection = variantSelection;
                if (typeof selection === 'boolean') {
                    // @ts-expect-error
                    selection = selection === true ? 'true' : 'false';
                }
                const selectionClassName = 
                // @ts-expect-error
                config.variantClassNames[variantName][selection];
                if (selectionClassName) {
                    className += ' ' + selectionClassName;
                }
            }
        }
        for (const [compoundCheck, compoundClassName] of config.compoundVariants) {
            if (shouldApplyCompound(compoundCheck, selections, config.defaultVariants)) {
                className += ' ' + compoundClassName;
            }
        }
        return className;
    };
    runtimeFn.variants = () => Object.keys(config.variantClassNames);
    const Comp = (0, react_1.forwardRef)(function Comp(props, ref) {
        return (0, react_1.createElement)(el, Object.assign(Object.assign({ ref }, props), { className: runtimeFn }));
    });
    // const Component = function Component(props: React.ComponentProps<T>) {
    //   return createElement(el, {
    //     className: runtimeFn(),
    //     ...props,
    //   });
    // };
    Comp.displayName = `Styled(${el})`;
    return Comp;
    // return runtimeFn;
};
exports.recipeRuntime = recipeRuntime;
