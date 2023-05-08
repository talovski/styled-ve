"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipe = void 0;
const css_1 = require("@vanilla-extract/css");
const functionSerializer_1 = require("@vanilla-extract/css/functionSerializer");
const recipeRuntime_1 = require("./recipeRuntime");
function mapValues(input, fn) {
    const result = {};
    for (const key in input) {
        result[key] = fn(input[key], key);
    }
    return result;
}
function recipe(options, el, debugId) {
    const { variants = {}, defaultVariants = {}, compoundVariants = [], base = '', } = options;
    const defaultClassName = typeof base === 'string' ? base : (0, css_1.style)(base, debugId);
    // @ts-expect-error
    const variantClassNames = mapValues(variants, (variantGroup, variantGroupName) => (0, css_1.styleVariants)(variantGroup, (styleRule) => typeof styleRule === 'string' ? [styleRule] : styleRule, debugId ? `${debugId}_${variantGroupName}` : variantGroupName));
    const compounds = [];
    for (const { style: theStyle, variants } of compoundVariants) {
        compounds.push([
            variants,
            typeof theStyle === 'string'
                ? theStyle
                : (0, css_1.style)(theStyle, `${debugId}_compound_${compounds.length}`),
        ]);
    }
    // const Component = createRuntimeFn(el, config);
    const config = {
        defaultClassName,
        variantClassNames,
        defaultVariants,
        compoundVariants: compounds,
    };
    //
    const args = [config, el];
    const Component = (0, recipeRuntime_1.createRecipe)(config, el);
    (0, functionSerializer_1.addFunctionSerializer)(Component, {
        importPath: 'styled-ve/recipeRuntime',
        importName: 'recipeRuntime',
        args: args,
    });
    return Component;
    // return addRecipe(createRuntimeFn(config), {
    //   importPath: '@vanilla-extract/recipes/createRuntimeFn',
    //   importName: 'createRuntimeFn',
    //   // @ts-expect-error
    //   args: [config],
    // });
}
exports.recipe = recipe;