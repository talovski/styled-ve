import {createElement, forwardRef} from 'react';
import type {
  PatternResult,
  RuntimeFn,
  VariantGroups,
  VariantSelection,
} from './types';

const shouldApplyCompound = <Variants extends VariantGroups>(
  compoundCheck: VariantSelection<Variants>,
  selections: VariantSelection<Variants>,
  defaultVariants: VariantSelection<Variants>,
) => {
  for (const key of Object.keys(compoundCheck)) {
    if (compoundCheck[key] !== (selections[key] ?? defaultVariants[key])) {
      return false;
    }
  }

  return true;
};


export const recipeRuntime = <Variants extends VariantGroups, T extends keyof JSX.IntrinsicElements>(
  config: PatternResult<Variants>,
  el: T,
) /*: RuntimeFn<Variants> */ => {
  const runtimeFn: RuntimeFn<Variants> = (options) => {
    let className = config.defaultClassName;

    const selections: VariantSelection<Variants> = {
      ...config.defaultVariants,
      ...options,
    };
    for (const variantName in selections) {
      const variantSelection =
        selections[variantName] ?? config.defaultVariants[variantName];

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
      if (
        shouldApplyCompound(compoundCheck, selections, config.defaultVariants)
      ) {
        className += ' ' + compoundClassName;
      }
    }

    return className;
  };

  runtimeFn.variants = () => Object.keys(config.variantClassNames);

  const Comp = forwardRef(function Comp(props, ref) {
    return createElement(el, { ref, ...props, className: runtimeFn})
  })
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
