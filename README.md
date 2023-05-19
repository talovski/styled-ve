# Styled API for Vanilla Extract CSS
Adds a small utility on top of Vanilla Extract `style` method. Instead of:
```ts
export const buttonStyle = style({
  display: 'flex'
})

...

<button className={buttonStyle}></button>
```
You can use Styled Components API like that:
```ts
export const Button = styled('button', {
  display: 'flex'
})
