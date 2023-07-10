# No Scroll

No Scroll is a JavaScript utility for disabling and re-enabling scroll without causing layout shift. It works by displaying a pseudo element to occupy the space created on some devices when removing the scrollbar. The script will first detect the amount of space the scrollbar takes up so it will also work on devices with overlay scrollbars that don't take up space.

<a href="http://alexanderspirgel.com/no-scroll/demo" target="_blank">View Demo →</a>

## Installation

### Option 1: Install using NPM

Install the script using NPM via the command line:

```
npm install @alexspirgel/no-scroll
```

Require the script in the codebase where necessary:

```js
const noScroll = require('@alexspirgel/no-scroll');
```

### Option 2: Install using a script tag

Download the normal or minified script from the 'dist' folder.

Add a script tag with a path to the downloaded file. Make sure this script tag is placed before other script tags that need access to it.

```html
<script src="path/to/no-scroll.min.js"></script>
```

## Usage

```css

```

```html

```

```js

```