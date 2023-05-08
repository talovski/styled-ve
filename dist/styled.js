"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styled = exports.createRecipe = exports.recipe = void 0;
const styledRuntime_1 = require("./styledRuntime");
const functionSerializer_1 = require("@vanilla-extract/css/functionSerializer");
const css_1 = require("@vanilla-extract/css");
var styledRecipe_1 = require("./styledRecipe");
Object.defineProperty(exports, "recipe", { enumerable: true, get: function () { return styledRecipe_1.recipe; } });
var recipeRuntime_1 = require("./recipeRuntime");
Object.defineProperty(exports, "createRecipe", { enumerable: true, get: function () { return recipeRuntime_1.createRecipe; } });
function styled(el, rules) {
    const className = (0, css_1.style)(rules);
    const args = [el, className];
    const Component = (0, styledRuntime_1.styledRuntime)(el, className);
    (0, functionSerializer_1.addFunctionSerializer)(Component, {
        importPath: 'styled-ve/runtime',
        importName: 'runtime',
        args: args,
    });
    return Component;
}
exports.styled = styled;
