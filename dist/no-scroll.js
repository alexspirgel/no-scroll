/*!
 * no-scroll v1.0.0
 * https://github.com/alexspirgel/no-scroll
 */
var noScroll;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 297:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const isPlainObject = __webpack_require__(605);

function extend(...arguments) {
	let target = arguments[0];
	let merge;
	for (let argumentIndex = 1; argumentIndex < arguments.length; argumentIndex++) {
		merge = arguments[argumentIndex];
		if (merge === target) {
			continue;
		}
		if (Array.isArray(merge)) {
			target = [];
			for (const index of merge.keys()) {
				target[index] = extend(target[index], merge[index]);
			}
		}
		else if (isPlainObject(merge)) {
			if (!isPlainObject(target)) {
				target = {};
			}
			for (const property in merge) {
				target[property] = extend(target[property], merge[property]);
			}
		}
		else if (merge !== undefined) {
			target = merge;
		}
	}
	return target;
}

module.exports = extend;

/***/ }),

/***/ 605:
/***/ ((module) => {

function isPlainObject(value) {
	if (typeof value !== 'object' ||
	value === null ||
	Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}
	if (Object.getPrototypeOf(value) === null) {
    return true;
  }
	let prototype = value;
  while (Object.getPrototypeOf(prototype) !== null) {
    prototype = Object.getPrototypeOf(prototype);
  }
  return Object.getPrototypeOf(value) === prototype;
}

module.exports = isPlainObject;

/***/ }),

/***/ 138:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const isPlainObject = __webpack_require__(605);
const extend = __webpack_require__(297);

module.exports = class NoScroll {

	static get dataAttributeNames() {
		return {
			element: 'data-no-scroll-element',
			xState: 'data-no-scroll-x-state',
			yState: 'data-no-scroll-y-state'
		};
	}

	static get stateValues() {
		return {
			scroll: 'scroll',
			noScroll: 'no-scroll'
		};
	}

	static get defaultOptions() {
		return {
			axis: 'y',
			horizontalScrollbarHeightCSSVariableName: '--no-scroll--horizontal-scrollbar-height',
			verticalScrollbarWidthCSSVariableName: '--no-scroll--vertical-scrollbar-width',
			documentWidthOffsetCSSVariableName: '--no-scroll--document-width-offset',
		};
	}

	static normalizeOptions(options) {
		const normalizedOptions = extend({}, this.defaultOptions, options);
		// outerElement
		if (typeof normalizedOptions.outerElement === 'string') {
			normalizedOptions.outerElement = document.querySelector(normalizedOptions.outerElement);
		}
		// innerElement
		if (typeof normalizedOptions.innerElement === 'string') {
			normalizedOptions.innerElement = normalizedOptions.outerElement.querySelector(normalizedOptions.innerElement);
		}
		// axis
		if (typeof normalizedOptions.axis === 'string') {
			const normalizedAxis = {
				x: false,
				y: false,
			};
			if (normalizedOptions.axis === 'x') {
				normalizedAxis.x = true;
			}
			else if (normalizedOptions.axis === 'y') {
				normalizedAxis.y = true;
			}
			normalizedOptions.axis = normalizedAxis;
		}
		return normalizedOptions;
	}

	static isOuterElementDocumentElement(options) {
		if (options.outerElement === document.documentElement) {
			return true;
		}
		else {
			return false;
		}
	}
	
	static getElementHorizontalScrollbarHeight(options) {
		let size = 0;
		let outerSize = options.outerElement.offsetHeight;
		if (this.isOuterElementDocumentElement(options)) {
			outerSize = window.innerHeight;
		}
		const innerSize = options.innerElement.offsetHeight;
		const outerElementComputedStyles = window.getComputedStyle(options.outerElement);
		const borderTopWidth = parseInt(outerElementComputedStyles.borderTopWidth);
		const borderBottomWidth = parseInt(outerElementComputedStyles.borderBottomWidth);
		size = (outerSize - borderTopWidth - borderBottomWidth) - innerSize;
		if (size < 0) {
			size = 0;
		}
		return size;
	}

	static getElementVerticalScrollbarWidth(options) {
		let size = 0;
		let outerSize = options.outerElement.offsetWidth;
		if (this.isOuterElementDocumentElement(options)) {
			outerSize = window.innerWidth;
		}
		const innerSize = options.innerElement.offsetWidth;
		const outerElementComputedStyles = window.getComputedStyle(options.outerElement);
		const borderLeftWidth = parseInt(outerElementComputedStyles.borderLeftWidth);
		const borderRightWidth = parseInt(outerElementComputedStyles.borderRightWidth);
		size = (outerSize - borderLeftWidth - borderRightWidth) - innerSize;
		if (size < 0) {
			size = 0;
		}
		return size;
	}

	static setHorizontalScrollbarHeightCSSVariable(options, value) {
		if (typeof value === 'undefined') {
			value = this.getElementHorizontalScrollbarHeight(options);
		}
		if (typeof value === 'number') {
			value = value.toString() + 'px';
		}
		options.outerElement.style.setProperty(options.horizontalScrollbarHeightCSSVariableName, value);
	}

	static setVerticalScrollbarWidthCSSVariable(options, value) {
		if (typeof value === 'undefined') {
			value = this.getElementVerticalScrollbarWidth(options);
		}
		if (typeof value === 'number') {
			value = value.toString() + 'px';
		}
		options.outerElement.style.setProperty(options.verticalScrollbarWidthCSSVariableName, value);
		if (this.isOuterElementDocumentElement(options)) {
			options.outerElement.style.setProperty(options.documentWidthOffsetCSSVariableName, value);
		}
	}

	static isScrollEnabled(options) {
		options = this.normalizeOptions(options);
		const returnObject = {
			x: true,
			y: true
		};
		if (options.outerElement.getAttribute(this.dataAttributeNames.xState) === this.stateValues.noScroll) {
			returnObject.x = false;
		}
		if (options.outerElement.getAttribute(this.dataAttributeNames.yState) === this.stateValues.noScroll) {
			returnObject.y = false;
		}
		return returnObject;
	}

	static disableScroll(options) {
		options = this.normalizeOptions(options);
		options.outerElement.setAttribute(this.dataAttributeNames.element, 'outer');
		options.innerElement.setAttribute(this.dataAttributeNames.element, 'inner');
		if (options.axis.x) {
			this.setHorizontalScrollbarHeightCSSVariable(options);
			options.outerElement.setAttribute(this.dataAttributeNames.xState, this.stateValues.noScroll);
		}
		if (options.axis.y) {
			this.setVerticalScrollbarWidthCSSVariable(options);
			options.outerElement.setAttribute(this.dataAttributeNames.yState, this.stateValues.noScroll);
		}
	}

	static enableScroll(options) {
		options = this.normalizeOptions(options);
		if (options.axis.x) {
			this.setHorizontalScrollbarHeightCSSVariable(options, 0);
			options.outerElement.setAttribute(this.dataAttributeNames.xState, this.stateValues.scroll);
		}
		if (options.axis.y) {
			this.setVerticalScrollbarWidthCSSVariable(options, 0);
			options.outerElement.setAttribute(this.dataAttributeNames.yState, this.stateValues.scroll);
		}
	}

	static toggleScroll(options) {
		options = this.normalizeOptions(options);
		console.log(options);
		const isScrollEnabled = this.isScrollEnabled(options);
		if (options.axis.x) {
			const xOptions = extend({}, options);
			xOptions.axis.y = false;
			if (isScrollEnabled.x) {
				this.disableScroll(xOptions);
			}
			else {
				this.enableScroll(xOptions);
			}
		}
		if (options.axis.y) {
			const yOptions = extend({}, options);
			yOptions.axis.x = false;
			if (isScrollEnabled.y) {
				this.disableScroll(yOptions);
			}
			else {
				this.enableScroll(yOptions);
			}
		}
	}

};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(138);
/******/ 	noScroll = __webpack_exports__;
/******/ 	
/******/ })()
;