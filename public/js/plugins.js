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
 Auto-updated progress bars.
 */
$('.progress-preview').each(function () {
	var el = $(this);

	function up() {
		var width = el.find('.bar').width();
		var parentWidth = el.width();
		var percent = Math.round((100 * width / parentWidth));
		var plus = Math.round(Math.random() * 10);
		var newPercent = percent + plus;
		if (newPercent > 100) {
			newPercent = 0;
		}
		el.find('.bar').width(newPercent + "%").html(newPercent + "%");
		setTimeout(up, 1500);
	}

	up();
});

/*
 Daterange pickers.
 */
$('#daterangepicker-simple').daterangepicker();

$('#daterangepicker-dropdown').daterangepicker({
	minDate      : '01/01/2010',
	maxDate      : '12/31/2015',
	showDropdowns: true
});

$('#daterangepicker-range').daterangepicker({
	dateLimit: { days: 3 }
});

$('#daterangepicker-reportrange').daterangepicker({
		ranges         : {
			'Today'       : [new Date(), new Date()],
			'Yesterday'   : [moment().subtract('days', 1), moment().subtract('days', 1)],
			'Last 7 Days' : [moment().subtract('days', 6), new Date()],
			'Last 30 Days': [moment().subtract('days', 29), new Date()],
			'This Month'  : [moment().startOf('month'), moment().endOf('month')],
			'Last Month'  : [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
		},
		opens          : 'left',
		format         : 'MM/DD/YYYY',
		separator      : ' to ',
		startDate      : moment().subtract('days', 29),
		endDate        : new Date(),
		minDate        : '01/01/2012',
		maxDate        : '12/31/2013',
		locale         : {
			applyLabel      : 'Submit',
			fromLabel       : 'From',
			toLabel         : 'To',
			customRangeLabel: 'Custom Range',
			daysOfWeek      : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			monthNames      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			firstDay        : 1
		},
		showWeekNumbers: true,
		buttonClasses  : ['btn-danger'],
		dateLimit      : false
	},
	function (start, end) {
		$('#daterangepicker-reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
	}
);
//Set the initial state of the picker label
$('#daterangepicker-reportrange span').html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
});/*
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