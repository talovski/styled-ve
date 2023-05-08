"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functionSerializer_1 = require("@vanilla-extract/css/functionSerializer");
const css_1 = require("@vanilla-extract/css");
const runtime_1 = require("./runtime");
function styled(el, rules) {
    const className = (0, css_1.style)(rules);
    const args = [el, className];
    const Component = (0, runtime_1.runtime)(el, className);
    (0, functionSerializer_1.addFunctionSerializer)(Component, {
        importPath: 'styled-ve/runtime',
        importName: 'runtime',
        args: args,
    });
    return Component;
}
exports.default = styled;
