# stencil-inline-svg

A Stenciljs plugin to insert inline SVGs into components on build time.

## Installation

```bash
npm install -D stencil-inline-svg
```

## Usage

First of all, you need to declare the global `*.svg` module on your TypeScript project, if you haven't done that yet so it will be possible to directly import SVG files `import Icon from './my-icon.svg'`.

```javascript
// src/typings.d.ts (example name)
declare module '*.svg' {
  const svgContent: string;

  export default svgContent;
}
```

Import the plugin on your `stencil.config.ts` file and add the `inlineSvg` function to your plugins list.

```javascript
import { Config } from '@stencil/core';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  namespace: 'mycomponent',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [inlineSvg()],
};
```

Now, just import your file and set it as the `innerHTML` property of an element inside your component.

```javascript
import { Component } from '@stencil/core';
import Lambo from '../../assets/img/gallardo.svg';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  render() {
    return <div class='svg-container' innerHTML={Lambo} />;
  }
}
```

## Links

Stenciljs - https://stenciljs.com/
Lamborghini SVG - https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/gallardo.svg
