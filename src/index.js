const isPlainObject = require('@alexspirgel/is-plain-object');
const extend = require('@alexspirgel/extend');

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