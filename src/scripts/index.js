const extend = require('@alexspirgel/extend');
const isElement = require('@alexspirgel/is-element');

module.exports = class NoScroll {
	
	static get stateValues() {
		return {
			scroll: 'scroll',
			noScroll: 'no-scroll'
		};
	}

	static get defaultOptions() {
		return {
			axis: 'y',
			dataAttributeName: {
				element: 'data-no-scroll-element',
				xState: 'data-no-scroll-x-state',
				yState: 'data-no-scroll-y-state',
			},
			cssVariableName: {
				xScrollbarHeight: '--no-scroll--x-scrollbar-height',
				yScrollbarWidth: '--no-scroll--y-scrollbar-width',
				documentWidthOffset: '--no-scroll--document-width-offset',
			},
		};
	}

	static validateOptions(options) {
		const errorPrefix = 'No Scroll';
		// outerElement
		if (typeof options.outerElement !== 'string' && !isElement(options.outerElement)) {
			throw new Error(`${errorPrefix} option.outerElement must be a string or element.`);
		}
		// innerElement
		if (typeof options.innerElement !== 'string' && !isElement(options.innerElement)) {
			throw new Error(`${errorPrefix} option.innerElement must be a string or element.`);
		}
		// axis
		if (typeof options.axis !== 'string' && typeof options.axis !== 'object' && typeof options.axis !== 'undefined') {
			throw new Error(`${errorPrefix} option.axis must be a string, object, or undefined.`);
		}
		if (typeof options.axis === 'object') {
			for (const property in options.axis) {
				if (property !== 'x'
				&& property !== 'y') {
					throw new Error(`${errorPrefix} option.axis object must only contain properties 'x' and/or 'y'.`);
				}
				else {
					if (typeof options.axis[property] !== 'boolean') {
						throw new Error(`${errorPrefix} option.axis.${property} must be a boolean.`);
					}
				}
			}
		}
		// cssVariableName
		if (typeof options.cssVariableName !== 'object' && typeof options.cssVariableName !== 'undefined') {
			throw new Error(`${errorPrefix} option.cssVariableName must be an object or undefined.`);
		}
		for (const property in options.cssVariableName) {
			if (property !== 'xScrollbarHeight'
			&& property !== 'yScrollbarWidth'
			&& property !== 'documentWidthOffset') {
				throw new Error(`${errorPrefix} option.axis object must only contain one or more of these properties 'xScrollbarHeight', 'yScrollbarWidth', and 'documentWidthOffset'.`);
			}
			else {
				if (typeof options.cssVariableName[property] !== 'string' && typeof options.cssVariableName[property] !== 'undefined') {
					throw new Error(`${errorPrefix} option.cssVariableName.${property} must be a string or undefined.`);
				}
			}
		}
		// dataAttributeName
		if (typeof options.dataAttributeName !== 'object' && typeof options.dataAttributeName !== 'undefined') {
			throw new Error(`${errorPrefix} option.dataAttributeName must be an object or undefined.`);
		}
		for (const property in options.dataAttributeName) {
			if (property !== 'element'
			&& property !== 'xState'
			&& property !== 'yState') {
				throw new Error(`${errorPrefix} option.axis object must only contain one or more of these properties 'element', 'xState', and 'yState'.`);
			}
			else {
				if (typeof options.dataAttributeName[property] !== 'string' && typeof options.dataAttributeName[property] !== 'undefined') {
					throw new Error(`${errorPrefix} option.dataAttributeName.${property} must be a string or undefined.`);
				}
			}
		}
	}

	static normalizeOptions(options) {
		if (!options.normalized) {
			this.validateOptions(options);
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
			options.normalized = true;
			return normalizedOptions;
		}
		else {
			return options;
		}
	}

	static isOuterElementDocumentElement(options) {
		options = this.normalizeOptions(options);
		if (options.outerElement === document.documentElement) {
			return true;
		}
		else {
			return false;
		}
	}
	
	static getElementXScrollbarHeight(options) {
		options = this.normalizeOptions(options);
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

	static getElementYScrollbarWidth(options) {
		options = this.normalizeOptions(options);
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

	static setXScrollbarHeightCSSVariable(options, value) {
		options = this.normalizeOptions(options);
		if (typeof value === 'undefined') {
			value = this.getElementXScrollbarHeight(options);
		}
		if (typeof value === 'number') {
			value = value.toString() + 'px';
		}
		options.outerElement.style.setProperty(options.cssVariableName.xScrollbarHeight, value);
	}

	static setYScrollbarWidthCSSVariable(options, value) {
		options = this.normalizeOptions(options);
		if (typeof value === 'undefined') {
			value = this.getElementYScrollbarWidth(options);
		}
		if (typeof value === 'number') {
			value = value.toString() + 'px';
		}
		options.outerElement.style.setProperty(options.cssVariableName.yScrollbarWidth, value);
		if (this.isOuterElementDocumentElement(options)) {
			options.outerElement.style.setProperty(options.cssVariableName.documentWidthOffset, value);
		}
	}

	static isScrollEnabled(options) {
		options = this.normalizeOptions(options);
		const returnObject = {
			x: true,
			y: true
		};
		if (options.outerElement.getAttribute(options.dataAttributeName.xState) === this.stateValues.noScroll) {
			returnObject.x = false;
		}
		if (options.outerElement.getAttribute(options.dataAttributeName.yState) === this.stateValues.noScroll) {
			returnObject.y = false;
		}
		return returnObject;
	}

	static disableScroll(options) {
		options = this.normalizeOptions(options);
		options.outerElement.setAttribute(options.dataAttributeName.element, 'outer');
		options.innerElement.setAttribute(options.dataAttributeName.element, 'inner');
		if (options.axis.x) {
			this.setXScrollbarHeightCSSVariable(options);
			options.outerElement.setAttribute(options.dataAttributeName.xState, this.stateValues.noScroll);
		}
		if (options.axis.y) {
			this.setYScrollbarWidthCSSVariable(options);
			options.outerElement.setAttribute(options.dataAttributeName.yState, this.stateValues.noScroll);
		}
	}

	static enableScroll(options) {
		options = this.normalizeOptions(options);
		if (options.axis.x) {
			this.setXScrollbarHeightCSSVariable(options, 0);
			options.outerElement.setAttribute(options.dataAttributeName.xState, this.stateValues.scroll);
		}
		if (options.axis.y) {
			this.setYScrollbarWidthCSSVariable(options, 0);
			options.outerElement.setAttribute(options.dataAttributeName.yState, this.stateValues.scroll);
		}
	}

	static toggleScroll(options) {
		options = this.normalizeOptions(options);
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