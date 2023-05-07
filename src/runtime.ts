import { createElement } from 'react';

export function runtime<T extends keyof JSX.IntrinsicElements>(
  el: T,
  className: string,
) {
  const Component = function Component(props: React.ComponentProps<T>) {
    return createElement(el, {
      ...props,
      className: [props.className, className].filter(Boolean).join(' '),
    });
  };

  Component.displayName = `Styled(${el})`;

  return Component;
}
