// highlight.js - code block formatting
hljs.highlightAll();

// Scroll toggle buttons
document.addEventListener("DOMContentLoaded", function() {

	// body
	document.querySelector('.body-toggle').addEventListener('click', () => {
		noScroll.toggleScroll({
			outerElement: document.documentElement,
			innerElement: document.body
		});
	});

	// vertical
	document.querySelector('.vertical-toggle').addEventListener('click', () => {
		noScroll.toggleScroll({
			outerElement: '.vertical-wrapper-outer',
			innerElement: '.vertical-wrapper-inner',
			axis: 'y'
		});
	});

	// horizontal
	document.querySelector('.horizontal-toggle').addEventListener('click', () => {
		noScroll.toggleScroll({
			outerElement: '.horizontal-wrapper-outer',
			innerElement: '.horizontal-wrapper-inner',
			axis: 'x'
		});
	});

	// both
	document.querySelector('.both-vertical-toggle').addEventListener('click', () => {
		noScroll.toggleScroll({
			outerElement: '.both-wrapper-outer',
			innerElement: '.both-wrapper-inner',
			axis: 'y'
		});
	});
	document.querySelector('.both-horizontal-toggle').addEventListener('click', () => {
		noScroll.toggleScroll({
			outerElement: '.both-wrapper-outer',
			innerElement: '.both-wrapper-inner',
			axis: 'x'
		});
	});
	document.querySelector('.both-toggle').addEventListener('click', () => {
		noScroll.toggleScroll({
			outerElement: '.both-wrapper-outer',
			innerElement: '.both-wrapper-inner',
			axis: {
				x: true,
				y: true
			}
		});
	});

});