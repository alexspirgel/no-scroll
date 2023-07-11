# No Scroll

No Scroll is a JavaScript utility for disabling and re-enabling scroll without causing layout shift. It works by displaying a pseudo element to occupy the space created on some devices when removing the scrollbar. The script will first detect the amount of space the scrollbar takes up so it will also work on devices with overlay scrollbars that don't take up space.

<a href="http://alexanderspirgel.com/no-scroll/demo" target="_blank">View Demo →</a>

## Installation

### Option 1: Install using NPM

Install the script using NPM:

```
npm install @alexspirgel/no-scroll
```

Require the script:

```js
const noScroll = require('@alexspirgel/no-scroll');
```

Import the styles:

```scss
@import 'node_modules/@alexspirgel/no-scroll/src/styles/partials/_mixin.scss';
@include no-scroll();
```
If you are not compiling scss, you can use the pre-built dist styles instead.

### Option 2: Install using script/style tags

Download the normal or minified script and styles from the 'dist' folder.

Add a script and style tag with a path to the downloaded script and styles.

```html
<link rel="stylesheet" href="path/to/no-scroll.min.css">
<script src="path/to/no-scroll.min.js"></script>
```

## Usage

```html
<div class="vertical-wrapper-outer" data-no-scroll-element="outer">
	<div class="vertical-wrapper-inner" data-no-scroll-element="inner">
		content here...
	</div>
</div>
```

```js
noScroll.toggleScroll({
	outerElement: '.vertical-wrapper-outer',
	innerElement: '.vertical-wrapper-inner',
	axis: 'y'
});
```
See the <a href="http://alexanderspirgel.com/no-scroll/demo" target="_blank">demo</a> for more examples.

## Options

### `outerElement` (required)

The outer element.

Type: `string | element reference`

### `innerElement` (required)

The inner element.

Type: `string | element reference`

### `axis`

The axis (or axes) to disable/enable scroll.

Type: `string | object`

Default: `'y'`

### `dataAttributeName`

An object of options for customizing data attribute names used by the script. These options will probably not be needed in most cases, but they exist just in case. Keep in mind that changing data attribute names from the default values will require matching updates to the CSS. See <a href="#customizing-css">Customizing CSS</a> for an explanation of how that should be done.

Type: `object`

### `dataAttributeName.element`

The element data attribute name.

Type: `string`

Default: `'data-no-scroll-element'`

### `dataAttributeName.xState`

The "x" axis scroll state data attribute name.

Type: `string`

Default: `'data-no-scroll-x-state'`

### `dataAttributeName.yState`

The "y" axis scroll state data attribute name.

Type: `string`

Default: `'data-no-scroll-y-state'`

### `cssVariableName`

An object of options for customizing CSS variable names used by the script. These options will probably not be needed in most cases, but they exist just in case. Keep in mind that changing CSS variable names from the default values will require matching updates to the CSS. See <a href="#customizing-css">Customizing CSS</a> for an explanation of how that should be done.

### `cssVariableName.xScrollbarHeight`

The "x" axis scrollbar height variable name.

Type: `string`

Default: `'--no-scroll--x-scrollbar-height'`

### `cssVariableName.yScrollbarWidth`

The "y" axis scrollbar width variable name.

Type: `string`

Default: `'--no-scroll--y-scrollbar-width'`

### `cssVariableName.documentWidthOffset`

The document width offset variable name. This variable is created when the `<html>` scroll is disabled/enabled. It can be used to account for the width difference created when the scrollbar is disabled vs. enabled. See an example of how to implement this on the "Toggle Body Scroll" button element on the <a href="http://alexanderspirgel.com/no-scroll/demo" target="_blank">demo</a> page. 

Type: `string`

Default: `'--no-scroll--document-width-offset'`

## Customizing CSS

If the any of the `dataAttributeName` or `cssVariableName` options are changed from their default values, the CSS must be updated to match.

### Option 1: Utilizing Mixin Options

The `no-scroll` mixin options can be used to customize the data attribute names and the css variable names.

These are the default values, but they can be changed as needed to match options passed to the JavaScript:

```scss
@include no-scroll((
	data-attribute-name: (
		element: 'data-no-scroll-element',
		x-state: 'data-no-scroll-x-state',
		y-state: 'data-no-scroll-y-state',
	),
	css-variable-name: (
		x-scrollbar-height: '--no-scroll--x-scrollbar-height',
		y-scrollbar-width: '--no-scroll--y-scrollbar-width',
		document-width-offset: '--no-scroll--document-width-offset',
	)
));
```

### Option 2: Find & Replace Compiled Styles

Alternatively, a simple find/replace of necessary values in the compiled stylesheet will work just as well.