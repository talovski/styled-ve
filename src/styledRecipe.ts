import { addRecipe } from '@vanilla-extract/css/recipe';
import { style, styleVariants } from '@vanilla-extract/css';
import { addFunctionSerializer } from '@vanilla-extract/css/functionSerializer';

import { createRuntimeFn } from './recipeRuntime';
import type {
  PatternOptions,
  PatternResult,
  RuntimeFn,
  VariantGroups,
  VariantSelection,
} from './types';

export type { RecipeVariants, RuntimeFn } from './types';

function mapValues<Input extends Record<string, any>, OutputValue>(
  input: Input,
  fn: (value: Input[keyof Input], key: keyof Input) => OutputValue,
): Record<keyof Input, OutputValue> {
  const result: any = {};

  for (const key in input) {
    result[key] = fn(input[key], key);
  }

  return result;
}

export function styledRecipe<T extends keyof JSX.IntrinsicElements, Variants extends VariantGroups>(
  options: PatternOptions<Variants>,
	el: T,
  debugId?: string,
) /*: RuntimeFn<Variants> */ {
  const {
    variants = {},
    defaultVariants = {},
    compoundVariants = [],
    base = '',
  } = options;

  const defaultClassName =
    typeof base === 'string' ? base : style(base, debugId);

  // @ts-expect-error
  const variantClassNames: PatternResult<Variants>['variantClassNames'] =
    mapValues(variants, (variantGroup, variantGroupName) =>
      styleVariants(
        variantGroup,
        (styleRule) =>
          typeof styleRule === 'string' ? [styleRule] : styleRule,
        debugId ? `${debugId}_${variantGroupName}` : variantGroupName,
      ),
    );

  const compounds: Array<[VariantSelection<Variants>, string]> = [];

  for (const { style: theStyle, variants } of compoundVariants) {
    compounds.push([
      variants,
      typeof theStyle === 'string'
        ? theStyle
        : style(theStyle, `${debugId}_compound_${compounds.length}`),
    ]);
  }

    // const Component = createRuntimeFn(el, config);

  const config: PatternResult<Variants> = {
    defaultClassName,
    variantClassNames,
    defaultVariants,
    compoundVariants: compounds,
  };
//
  const args = [config, el] as const;

  const Component = createRuntimeFn(config, el);

  addFunctionSerializer(Component, {
    importPath: 'styled-ve/recipeRuntime',
    importName: 'recipeRuntime',
    args: args as any,
  });

  return Component;



  // return addRecipe(createRuntimeFn(config), {
  //   importPath: '@vanilla-extract/recipes/createRuntimeFn',
  //   importName: 'createRuntimeFn',
  //   // @ts-expect-error
  //   args: [config],
  // });
}
