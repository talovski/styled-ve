import { addFunctionSerializer } from '@vanilla-extract/css/functionSerializer';
import { ComplexStyleRule, style } from '@vanilla-extract/css';
import { runtime } from './runtime';

function styled<T extends keyof JSX.IntrinsicElements>(
  el: T,
  rules: ComplexStyleRule,
) {
  const className = style(rules);
  const args = [el, className] as const;

  const Component = runtime(el, className);

  addFunctionSerializer(Component, {
    importPath: '@dessert-box/react/styledRuntime',
    importName: 'styledRuntime',
    // TODO: Fix this type, was complaining about string not being assignable to Serializable from VE lib
    args: args as any,
  });

  return Component;
}

export default styled;
