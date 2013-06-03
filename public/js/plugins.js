// Avoid `console` errors in browsers that lack a console.
(function () {
	var method;
	var noop = function () {
	};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

/*
 Add missing functionality to Bootstrap accordion
 that makes impossible to initially style unfolded accordion headers
 without mess with the unfolded styles.
 */
(function ($) {
	$('.accordion-body').each(function () {
		if ($(this).hasClass('in')) {
			$('[href="#' + $(this).attr('id') + '"]').addClass('accordion-unfolded').removeClass('accordion-folded');
		}
		else {
			$('[href="#' + $(this).attr('id') + '"]').addClass('accordion-folded').removeClass('accordion-unfolded');
		}
	});

	$('.accordion-toggle').on('click', function () {
		if ($($(this).attr('href')).hasClass('in')) {
			$(this).addClass('accordion-folded').removeClass('accordion-unfolded');
		}
		else {
			$(this).addClass('accordion-unfolded').removeClass('accordion-folded');
		}
	});
})(jQuery);

/*
 Make the code examples pretty.
 */
window.prettyPrint && prettyPrint();

/*
 Add support messaging
 */
(function ($) {
	/*
	 Add support for tooltips
	 */
	$(".tip").tooltip();


	/*
	 Add support for popovers
	 */
	$(".cf-popover").popover();
})(jQuery);