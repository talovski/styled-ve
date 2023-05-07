"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtime = void 0;
const react_1 = require("react");
function runtime(el, className) {
    const Component = function Component(props) {
        return (0, react_1.createElement)(el, Object.assign(Object.assign({}, props), { className: [props.className, className].filter(Boolean).join(' ') }));
    };
    Component.displayName = `Styled(${el})`;
    return Component;
}
exports.runtime = runtime;
