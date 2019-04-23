# @finepoint/hyperapp-prerender

Prerendering for @finepoint/hyperapp-page.

## Install

```
npm i @finepoint/hyperapp-prerender
```

## Usage

```js
import { prerender } from '@finepoint/hyperapp-prerender'
import { head, view } from './view.js'

prerender({
    head,
    view,
})
```

Note: This library uses ES6 modules, and Node.js doesn't support ES6 modules perfectly yet. So you should use Rollup or another tool.
