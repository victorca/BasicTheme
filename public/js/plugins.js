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
 * Knobs.
 */
function clock() {
	var $s = $(".second"),
		$m = $(".minute"),
		$h = $(".hour");
	d = new Date(),
		s = d.getSeconds(),
		m = d.getMinutes(),
		h = d.getHours();
	$s.val(s).trigger("change");
	$m.val(m).trigger("change");
	$h.val(h).trigger("change");
	setTimeout(clock, 1000);
}

clock();

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

(function ($) {
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
	if ($.fn.daterangepicker) {
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
	}

	/*
	 Charts
	 */
	if ($.plot) {
// Basic.
		var d1 = [];
		for (var i = 0; i < 14; i += 0.5) {
			d1.push([i, Math.sin(i)]);
		}

		var d2 = [
			[0, 3],
			[4, 8],
			[8, 5],
			[9, 13]
		];

// A null signifies separate line segments

		var d3 = [
			[0, 12],
			[7, 12],
			null,
			[7, 2.5],
			[12, 2.5]
		];

		$.plot('#chart-basic', [ d1, d2, d3 ]);

		// Series.
		var d1 = [];
		for (var i = 0; i < 14; i += 0.5) {
			d1.push([i, Math.sin(i)]);
		}

		var d2 = [
			[0, 3],
			[4, 8],
			[8, 5],
			[9, 13]
		];

		var d3 = [];
		for (var i = 0; i < 14; i += 0.5) {
			d3.push([i, Math.cos(i)]);
		}

		var d4 = [];
		for (var i = 0; i < 14; i += 0.1) {
			d4.push([i, Math.sqrt(i * 10)]);
		}

		var d5 = [];
		for (var i = 0; i < 14; i += 0.5) {
			d5.push([i, Math.sqrt(i)]);
		}

		var d6 = [];
		for (var i = 0; i < 14; i += 0.5 + Math.random()) {
			d6.push([i, Math.sqrt(2 * i + Math.sin(i) + 5)]);
		}

		$.plot("#chart-series", [
			{
				data : d1,
				lines: { show: true, fill: true }
			},
			{
				data: d2,
				bars: { show: true }
			},
			{
				data  : d3,
				points: { show: true }
			},
			{
				data : d4,
				lines: { show: true }
			},
			{
				data  : d5,
				lines : { show: true },
				points: { show: true }
			},
			{
				data : d6,
				lines: { show: true, steps: true }
			}
		]);

		// Options.
		var d1 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.25) {
			d1.push([i, Math.sin(i)]);
		}

		var d2 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.25) {
			d2.push([i, Math.cos(i)]);
		}

		var d3 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.1) {
			d3.push([i, Math.tan(i)]);
		}

		$.plot("#chart-options", [
			{ label: "sin(x)", data: d1 },
			{ label: "cos(x)", data: d2 },
			{ label: "tan(x)", data: d3 }
		], {
			series: {
				lines : { show: true },
				points: { show: true }
			},
			xaxis : {
				ticks: [
					0, [ Math.PI / 2, "\u03c0/2" ], [ Math.PI, "\u03c0" ],
					[ Math.PI * 3 / 2, "3\u03c0/2" ], [ Math.PI * 2, "2\u03c0" ]
				]
			},
			yaxis : {
				ticks       : 10,
				min         : -2,
				max         : 2,
				tickDecimals: 3
			},
			grid  : {
				backgroundColor: { colors: [ "#fff", "#eee" ] },
				borderWidth    : {
					top   : 1,
					right : 1,
					bottom: 2,
					left  : 2
				}
			}
		});

		// Annotations.
		var d1 = [];
		for (var i = 0; i < 20; ++i) {
			d1.push([i, Math.sin(i)]);
		}

		var data = [
			{ data: d1, label: "Pressure", color: "#333" }
		];

		var markings = [
			{ color: "#f6f6f6", yaxis: { from: 1 } },
			{ color: "#f6f6f6", yaxis: { to: -1 } },
			{ color: "#000", lineWidth: 1, xaxis: { from: 2, to: 2 } },
			{ color: "#000", lineWidth: 1, xaxis: { from: 8, to: 8 } }
		];

		var placeholder = $("#chart-annotations");

		var plot = $.plot(placeholder, data, {
			bars : { show: true, barWidth: 0.5, fill: 0.9 },
			xaxis: { ticks: [], autoscaleMargin: 0.02 },
			yaxis: { min: -2, max: 2 },
			grid : { markings: markings }
		});

		var o = plot.pointOffset({ x: 2, y: -1.2});

		// Append it to the placeholder that Flot already uses for positioning

		placeholder.append("<div style='position:absolute;left:" + (o.left + 4) + "px;top:" + o.top + "px;color:#666;font-size:smaller'>Warming up</div>");

		o = plot.pointOffset({ x: 8, y: -1.2});
		placeholder.append("<div style='position:absolute;left:" + (o.left + 4) + "px;top:" + o.top + "px;color:#666;font-size:smaller'>Actual measurements</div>");

		// Draw a little arrow on top of the last label to demonstrate canvas
		// drawing

		var ctx = plot.getCanvas().getContext("2d");
		ctx.beginPath();
		o.left += 4;
		ctx.moveTo(o.left, o.top);
		ctx.lineTo(o.left, o.top - 10);
		ctx.lineTo(o.left + 10, o.top - 5);
		ctx.lineTo(o.left, o.top);
		ctx.fillStyle = "#000";
		ctx.fill();

		// Toggling:
		var datasets = {
			"usa"    : {
				label: "USA",
				data : [
					[1988, 483994],
					[1989, 479060],
					[1990, 457648],
					[1991, 401949],
					[1992, 424705],
					[1993, 402375],
					[1994, 377867],
					[1995, 357382],
					[1996, 337946],
					[1997, 336185],
					[1998, 328611],
					[1999, 329421],
					[2000, 342172],
					[2001, 344932],
					[2002, 387303],
					[2003, 440813],
					[2004, 480451],
					[2005, 504638],
					[2006, 528692]
				]
			},
			"russia" : {
				label: "Russia",
				data : [
					[1988, 218000],
					[1989, 203000],
					[1990, 171000],
					[1992, 42500],
					[1993, 37600],
					[1994, 36600],
					[1995, 21700],
					[1996, 19200],
					[1997, 21300],
					[1998, 13600],
					[1999, 14000],
					[2000, 19100],
					[2001, 21300],
					[2002, 23600],
					[2003, 25100],
					[2004, 26100],
					[2005, 31100],
					[2006, 34700]
				]
			},
			"uk"     : {
				label: "UK",
				data : [
					[1988, 62982],
					[1989, 62027],
					[1990, 60696],
					[1991, 62348],
					[1992, 58560],
					[1993, 56393],
					[1994, 54579],
					[1995, 50818],
					[1996, 50554],
					[1997, 48276],
					[1998, 47691],
					[1999, 47529],
					[2000, 47778],
					[2001, 48760],
					[2002, 50949],
					[2003, 57452],
					[2004, 60234],
					[2005, 60076],
					[2006, 59213]
				]
			},
			"germany": {
				label: "Germany",
				data : [
					[1988, 55627],
					[1989, 55475],
					[1990, 58464],
					[1991, 55134],
					[1992, 52436],
					[1993, 47139],
					[1994, 43962],
					[1995, 43238],
					[1996, 42395],
					[1997, 40854],
					[1998, 40993],
					[1999, 41822],
					[2000, 41147],
					[2001, 40474],
					[2002, 40604],
					[2003, 40044],
					[2004, 38816],
					[2005, 38060],
					[2006, 36984]
				]
			},
			"denmark": {
				label: "Denmark",
				data : [
					[1988, 3813],
					[1989, 3719],
					[1990, 3722],
					[1991, 3789],
					[1992, 3720],
					[1993, 3730],
					[1994, 3636],
					[1995, 3598],
					[1996, 3610],
					[1997, 3655],
					[1998, 3695],
					[1999, 3673],
					[2000, 3553],
					[2001, 3774],
					[2002, 3728],
					[2003, 3618],
					[2004, 3638],
					[2005, 3467],
					[2006, 3770]
				]
			},
			"sweden" : {
				label: "Sweden",
				data : [
					[1988, 6402],
					[1989, 6474],
					[1990, 6605],
					[1991, 6209],
					[1992, 6035],
					[1993, 6020],
					[1994, 6000],
					[1995, 6018],
					[1996, 3958],
					[1997, 5780],
					[1998, 5954],
					[1999, 6178],
					[2000, 6411],
					[2001, 5993],
					[2002, 5833],
					[2003, 5791],
					[2004, 5450],
					[2005, 5521],
					[2006, 5271]
				]
			},
			"norway" : {
				label: "Norway",
				data : [
					[1988, 4382],
					[1989, 4498],
					[1990, 4535],
					[1991, 4398],
					[1992, 4766],
					[1993, 4441],
					[1994, 4670],
					[1995, 4217],
					[1996, 4275],
					[1997, 4203],
					[1998, 4482],
					[1999, 4506],
					[2000, 4358],
					[2001, 4385],
					[2002, 5269],
					[2003, 5066],
					[2004, 5194],
					[2005, 4887],
					[2006, 4891]
				]
			}
		};

		// hard-code color indices to prevent them from shifting as
		// countries are turned on/off

		var i = 0;
		$.each(datasets, function (key, val) {
			val.color = i;
			++i;
		});

		// insert checkboxes
		var choiceContainer = $("#choices");
		$.each(datasets, function (key, val) {
			choiceContainer.append("<br/><input type='checkbox' name='" + key +
				"' checked='checked' id='id" + key + "'></input>" +
				"<label for='id" + key + "'>"
				+ val.label + "</label>");
		});

		function plotAccordingToChoices() {

			var data = [];

			choiceContainer.find("input:checked").each(function () {
				var key = $(this).attr("name");
				if (key && datasets[key]) {
					data.push(datasets[key]);
				}
			});

			if (data.length > 0) {
				$.plot("#chart-toggling", data, {
					yaxis: {
						min: 0
					},
					xaxis: {
						tickDecimals: 0
					}
				});
			}
		}

		choiceContainer.find("input").click(plotAccordingToChoices);

		plotAccordingToChoices();

		// Symbols.
		function generate(offset, amplitude) {

			var res = [];
			var start = 0, end = 10;

			for (var i = 0; i <= 50; ++i) {
				var x = start + i / 50 * (end - start);
				res.push([x, amplitude * Math.sin(x + offset)]);
			}

			return res;
		}

		var data = [
			{ data: generate(2, 1.8), points: { symbol: "circle" } },
			{ data: generate(3, 1.5), points: { symbol: "square" } },
			{ data: generate(4, 0.9), points: { symbol: "diamond" } },
			{ data: generate(6, 1.4), points: { symbol: "triangle" } },
			{ data: generate(7, 1.1), points: { symbol: "cross" } }
		];

		$.plot("#chart-symbols", data, {
			series: {
				points: {
					show  : true,
					radius: 3
				}
			},
			grid  : {
				hoverable: true
			}
		});

		// Treshhold.
		var d1 = [];
		for (var i = 0; i <= 60; i += 1) {
			d1.push([i, parseInt(Math.random() * 30 - 10)]);
		}

		$.plot("#chart-threshold", [
			{
				data     : d1,
				color    : "rgb(30, 180, 20)",
				threshold: {
					below: 5,
					color: "rgb(200, 20, 30)"
				},
				lines    : {
					steps: true
				}
			}
		]);

		// Percentile.
		var males = {"15%": [
			[2, 88.0],
			[3, 93.3],
			[4, 102.0],
			[5, 108.5],
			[6, 115.7],
			[7, 115.6],
			[8, 124.6],
			[9, 130.3],
			[10, 134.3],
			[11, 141.4],
			[12, 146.5],
			[13, 151.7],
			[14, 159.9],
			[15, 165.4],
			[16, 167.8],
			[17, 168.7],
			[18, 169.5],
			[19, 168.0]
		], "90%"          : [
			[2, 96.8],
			[3, 105.2],
			[4, 113.9],
			[5, 120.8],
			[6, 127.0],
			[7, 133.1],
			[8, 139.1],
			[9, 143.9],
			[10, 151.3],
			[11, 161.1],
			[12, 164.8],
			[13, 173.5],
			[14, 179.0],
			[15, 182.0],
			[16, 186.9],
			[17, 185.2],
			[18, 186.3],
			[19, 186.6]
		], "25%"          : [
			[2, 89.2],
			[3, 94.9],
			[4, 104.4],
			[5, 111.4],
			[6, 117.5],
			[7, 120.2],
			[8, 127.1],
			[9, 132.9],
			[10, 136.8],
			[11, 144.4],
			[12, 149.5],
			[13, 154.1],
			[14, 163.1],
			[15, 169.2],
			[16, 170.4],
			[17, 171.2],
			[18, 172.4],
			[19, 170.8]
		], "10%"          : [
			[2, 86.9],
			[3, 92.6],
			[4, 99.9],
			[5, 107.0],
			[6, 114.0],
			[7, 113.5],
			[8, 123.6],
			[9, 129.2],
			[10, 133.0],
			[11, 140.6],
			[12, 145.2],
			[13, 149.7],
			[14, 158.4],
			[15, 163.5],
			[16, 166.9],
			[17, 167.5],
			[18, 167.1],
			[19, 165.3]
		], "mean"         : [
			[2, 91.9],
			[3, 98.5],
			[4, 107.1],
			[5, 114.4],
			[6, 120.6],
			[7, 124.7],
			[8, 131.1],
			[9, 136.8],
			[10, 142.3],
			[11, 150.0],
			[12, 154.7],
			[13, 161.9],
			[14, 168.7],
			[15, 173.6],
			[16, 175.9],
			[17, 176.6],
			[18, 176.8],
			[19, 176.7]
		], "75%"          : [
			[2, 94.5],
			[3, 102.1],
			[4, 110.8],
			[5, 117.9],
			[6, 124.0],
			[7, 129.3],
			[8, 134.6],
			[9, 141.4],
			[10, 147.0],
			[11, 156.1],
			[12, 160.3],
			[13, 168.3],
			[14, 174.7],
			[15, 178.0],
			[16, 180.2],
			[17, 181.7],
			[18, 181.3],
			[19, 182.5]
		], "85%"          : [
			[2, 96.2],
			[3, 103.8],
			[4, 111.8],
			[5, 119.6],
			[6, 125.6],
			[7, 131.5],
			[8, 138.0],
			[9, 143.3],
			[10, 149.3],
			[11, 159.8],
			[12, 162.5],
			[13, 171.3],
			[14, 177.5],
			[15, 180.2],
			[16, 183.8],
			[17, 183.4],
			[18, 183.5],
			[19, 185.5]
		], "50%"          : [
			[2, 91.9],
			[3, 98.2],
			[4, 106.8],
			[5, 114.6],
			[6, 120.8],
			[7, 125.2],
			[8, 130.3],
			[9, 137.1],
			[10, 141.5],
			[11, 149.4],
			[12, 153.9],
			[13, 162.2],
			[14, 169.0],
			[15, 174.8],
			[16, 176.0],
			[17, 176.8],
			[18, 176.4],
			[19, 177.4]
		]};

		var females = {"15%": [
			[2, 84.8],
			[3, 93.7],
			[4, 100.6],
			[5, 105.8],
			[6, 113.3],
			[7, 119.3],
			[8, 124.3],
			[9, 131.4],
			[10, 136.9],
			[11, 143.8],
			[12, 149.4],
			[13, 151.2],
			[14, 152.3],
			[15, 155.9],
			[16, 154.7],
			[17, 157.0],
			[18, 156.1],
			[19, 155.4]
		], "90%"            : [
			[2, 95.6],
			[3, 104.1],
			[4, 111.9],
			[5, 119.6],
			[6, 127.6],
			[7, 133.1],
			[8, 138.7],
			[9, 147.1],
			[10, 152.8],
			[11, 161.3],
			[12, 166.6],
			[13, 167.9],
			[14, 169.3],
			[15, 170.1],
			[16, 172.4],
			[17, 169.2],
			[18, 171.1],
			[19, 172.4]
		], "25%"            : [
			[2, 87.2],
			[3, 95.9],
			[4, 101.9],
			[5, 107.4],
			[6, 114.8],
			[7, 121.4],
			[8, 126.8],
			[9, 133.4],
			[10, 138.6],
			[11, 146.2],
			[12, 152.0],
			[13, 153.8],
			[14, 155.7],
			[15, 158.4],
			[16, 157.0],
			[17, 158.5],
			[18, 158.4],
			[19, 158.1]
		], "10%"            : [
			[2, 84.0],
			[3, 91.9],
			[4, 99.2],
			[5, 105.2],
			[6, 112.7],
			[7, 118.0],
			[8, 123.3],
			[9, 130.2],
			[10, 135.0],
			[11, 141.1],
			[12, 148.3],
			[13, 150.0],
			[14, 150.7],
			[15, 154.3],
			[16, 153.6],
			[17, 155.6],
			[18, 154.7],
			[19, 153.1]
		], "mean"           : [
			[2, 90.2],
			[3, 98.3],
			[4, 105.2],
			[5, 112.2],
			[6, 119.0],
			[7, 125.8],
			[8, 131.3],
			[9, 138.6],
			[10, 144.2],
			[11, 151.3],
			[12, 156.7],
			[13, 158.6],
			[14, 160.5],
			[15, 162.1],
			[16, 162.9],
			[17, 162.2],
			[18, 163.0],
			[19, 163.1]
		], "75%"            : [
			[2, 93.2],
			[3, 101.5],
			[4, 107.9],
			[5, 116.6],
			[6, 122.8],
			[7, 129.3],
			[8, 135.2],
			[9, 143.7],
			[10, 148.7],
			[11, 156.9],
			[12, 160.8],
			[13, 163.0],
			[14, 165.0],
			[15, 165.8],
			[16, 168.7],
			[17, 166.2],
			[18, 167.6],
			[19, 168.0]
		], "85%"            : [
			[2, 94.5],
			[3, 102.8],
			[4, 110.4],
			[5, 119.0],
			[6, 125.7],
			[7, 131.5],
			[8, 137.9],
			[9, 146.0],
			[10, 151.3],
			[11, 159.9],
			[12, 164.0],
			[13, 166.5],
			[14, 167.5],
			[15, 168.5],
			[16, 171.5],
			[17, 168.0],
			[18, 169.8],
			[19, 170.3]
		], "50%"            : [
			[2, 90.2],
			[3, 98.1],
			[4, 105.2],
			[5, 111.7],
			[6, 118.2],
			[7, 125.6],
			[8, 130.5],
			[9, 138.3],
			[10, 143.7],
			[11, 151.4],
			[12, 156.7],
			[13, 157.7],
			[14, 161.0],
			[15, 162.0],
			[16, 162.8],
			[17, 162.2],
			[18, 162.8],
			[19, 163.3]
		]};

		var dataset = [
			{ label: "Female mean", data: females["mean"], lines: { show: true }, color: "rgb(255,50,50)" },
			{ id: "f15%", data: females["15%"], lines: { show: true, lineWidth: 0, fill: false }, color: "rgb(255,50,50)" },
			{ id: "f25%", data: females["25%"], lines: { show: true, lineWidth: 0, fill: 0.2 }, color: "rgb(255,50,50)", fillBetween: "f15%" },
			{ id: "f50%", data: females["50%"], lines: { show: true, lineWidth: 0.5, fill: 0.4, shadowSize: 0 }, color: "rgb(255,50,50)", fillBetween: "f25%" },
			{ id: "f75%", data: females["75%"], lines: { show: true, lineWidth: 0, fill: 0.4 }, color: "rgb(255,50,50)", fillBetween: "f50%" },
			{ id: "f85%", data: females["85%"], lines: { show: true, lineWidth: 0, fill: 0.2 }, color: "rgb(255,50,50)", fillBetween: "f75%" },

			{ label: "Male mean", data: males["mean"], lines: { show: true }, color: "rgb(50,50,255)" },
			{ id: "m15%", data: males["15%"], lines: { show: true, lineWidth: 0, fill: false }, color: "rgb(50,50,255)" },
			{ id: "m25%", data: males["25%"], lines: { show: true, lineWidth: 0, fill: 0.2 }, color: "rgb(50,50,255)", fillBetween: "m15%" },
			{ id: "m50%", data: males["50%"], lines: { show: true, lineWidth: 0.5, fill: 0.4, shadowSize: 0 }, color: "rgb(50,50,255)", fillBetween: "m25%" },
			{ id: "m75%", data: males["75%"], lines: { show: true, lineWidth: 0, fill: 0.4 }, color: "rgb(50,50,255)", fillBetween: "m50%" },
			{ id: "m85%", data: males["85%"], lines: { show: true, lineWidth: 0, fill: 0.2 }, color: "rgb(50,50,255)", fillBetween: "m75%" }
		];

		$.plot($("#chart-percentile"), dataset, {
			xaxis : {
				tickDecimals: 0
			},
			yaxis : {
				tickFormatter: function (v) {
					return v + " cm";
				}
			},
			legend: {
				position: "se"
			}
		});

		// Image.
		var datax = [[["/images/backgrounds/hs-2004-27-a-large-web.jpg", -10, -10, 10, 10]]];

		var options = {
			series: {
				images: {
					show: true
				}
			},
			xaxis: {
				min: -8,
				max: 4
			},
			yaxis: {
				min: -8,
				max: 4
			}
		};

		$.plot.image.loadDataImages(datax, options, function () {
			$.plot("#chart-image", datax, options);
		});

		// Error.
		function drawArrow(ctx, x, y, radius) {
			ctx.beginPath();
			ctx.moveTo(x + radius, y + radius);
			ctx.lineTo(x, y);
			ctx.lineTo(x - radius, y + radius);
			ctx.stroke();
		}

		function drawSemiCircle(ctx, x, y, radius) {
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI, false);
			ctx.moveTo(x - radius, y);
			ctx.lineTo(x + radius, y);
			ctx.stroke();
		}

		var data1 = [
			[1, 1, .5, .1, .3],
			[2, 2, .3, .5, .2],
			[3, 3, .9, .5, .2],
			[1.5, -.05, .5, .1, .3],
			[3.15, 1., .5, .1, .3],
			[2.5, -1., .5, .1, .3]
		];

		var data1_points = {
			show     : true,
			radius   : 5,
			fillColor: "blue",
			errorbars: "xy",
			xerr     : {show: true, asymmetric: true, upperCap: "-", lowerCap: "-"},
			yerr     : {show: true, color: "red", upperCap: "-"}
		};

		var data2 = [
			[.7, 3, .2, .4],
			[1.5, 2.2, .3, .4],
			[2.3, 1, .5, .2]
		];

		var data2_points = {
			show     : true,
			radius   : 5,
			errorbars: "y",
			yerr     : {show: true, asymmetric: true, upperCap: drawArrow, lowerCap: drawSemiCircle}
		};

		var data3 = [
			[1, 2, .4],
			[2, 0.5, .3],
			[2.7, 2, .5]
		];

		var data3_points = {
			//do not show points
			radius   : 0,
			errorbars: "y",
			yerr     : {show: true, upperCap: "-", lowerCap: "-", radius: 5}
		};

		var data4 = [
			[1.3, 1],
			[1.75, 2.5],
			[2.5, 0.5]
		];

		var data4_errors = [0.1, 0.4, 0.2];
		for (var i = 0; i < data4.length; i++) {
			data4_errors[i] = data4[i].concat(data4_errors[i])
		}

		var data = [
			{color: "blue", points: data1_points, data: data1, label: "data1"},
			{color: "red", points: data2_points, data: data2, label: "data2"},
			{color: "green", lines: {show: true}, points: data3_points, data: data3, label: "data3"},
			// bars with errors
			{color: "orange", bars: {show: true, align: "center", barWidth: 0.25}, data: data4, label: "data4"},
			{color: "orange", points: data3_points, data: data4_errors}
		];

		$.plot($("#chart-error"), data, {
			legend: {
				position: "sw",
				show    : true
			},
			series: {
				lines: {
					show: false
				}
			},
			xaxis : {
				min: 0.6,
				max: 3.1
			},
			yaxis : {
				min: 0,
				max: 3.5
			},
			zoom  : {
				interactive: true
			},
			pan   : {
				interactive: true
			}
		});
	}
})(jQuery);/*
 Knobs.
 */
function clock() {
	var $s = $(".second"),
		$m = $(".minute"),
		$h = $(".hour");
	d = new Date(),
		s = d.getSeconds(),
		m = d.getMinutes(),
		h = d.getHours();
	$s.val(s).trigger("change");
	$m.val(m).trigger("change");
	$h.val(h).trigger("change");
	setTimeout("clock()", 1000);
}
clock();});/*
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