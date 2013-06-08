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

		// Real time.
		// We use an inline data source in the example, usually data would
		// be fetched from a server

		var data = [],
			totalPoints = 300;

		function getRandomData() {

			if (data.length > 0)
				data = data.slice(1);

			// Do a random walk

			while (data.length < totalPoints) {

				var prev = data.length > 0 ? data[data.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;

				if (y < 0) {
					y = 0;
				} else if (y > 100) {
					y = 100;
				}

				data.push(y);
			}

			// Zip the generated y values with the x values

			var res = [];
			for (var i = 0; i < data.length; ++i) {
				res.push([i, data[i]])
			}

			return res;
		}

		// Set up the control widget

		var updateInterval = 30;

		var plot = $.plot("#chart-real-time", [ getRandomData() ], {
			series: {
				shadowSize: 0	// Drawing is faster without shadows
			},
			yaxis : {
				min: 0,
				max: 100
			},
			xaxis : {
				show: false
			}
		});

		function update() {

			plot.setData([getRandomData()]);

			// Since the axes don't change, we don't need to call plot.setupGrid()

			plot.draw();
			setTimeout(update, updateInterval);
		}

		update();

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
		var datax = [
			[
				["/images/backgrounds/hs-2004-27-a-large-web.jpg", -10, -10, 10, 10]
			]
		];

		var optionsx = {
			series: {
				images: {
					show: true
				}
			},
			xaxis : {
				min: -8,
				max: 4
			},
			yaxis : {
				min: -8,
				max: 4
			}
		};

		$.plot.image.loadDataImages(datax, optionsx, function () {
			$.plot("#chart-image", datax, optionsx);
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

		// Pie.
// Randomly Generated Data

		var data = [],
			series = Math.floor(Math.random() * 6) + 3;

		for (var i = 0; i < series; i++) {
			data[i] = {
				label: "Series" + (i + 1),
				data : Math.floor(Math.random() * 100) + 1
			}
		}

		var placeholder = $("#chart-pie");

		$("#example-1").click(function () {

			placeholder.unbind();

			$("#pie-title").text("Default pie chart");
			$("#pie-description").text("The default pie chart with no options set.");

			$.plot(placeholder, data, {
				series: {
					pie: {
						show: true
					}
				}
			});
		});

		$("#example-2").click(function () {

			placeholder.unbind();

			$("#pie-title").text("Default without legend");
			$("#pie-description").text("The default pie chart when the legend is disabled. Since the labels would normally be outside the container, the chart is resized to fit.");

			$.plot(placeholder, data, {
				series: {
					pie: {
						show: true
					}
				},
				legend: {
					show: false
				}
			});
		});

		$("#example-3").click(function () {

			placeholder.unbind();

			$("#pie-title").text("Custom Label Formatter");
			$("#pie-description").text("Added a semi-transparent background to the labels and a custom labelFormatter function.");

			$.plot(placeholder, data, {
				series: {
					pie: {
						show  : true,
						radius: 1,
						label : {
							show      : true,
							radius    : 1,
							formatter : labelFormatter,
							background: {
								opacity: 0.8
							}
						}
					}
				},
				legend: {
					show: false
				}
			});
		});

		$("#example-4").click(function () {

			placeholder.unbind();

			$("#pie-title").text("Label Radius");
			$("#pie-description").text("Slightly more transparent label backgrounds and adjusted the radius values to place them within the pie.");

			$.plot(placeholder, data, {
				series: {
					pie: {
						show  : true,
						radius: 1,
						label : {
							show      : true,
							radius    : 3 / 4,
							formatter : labelFormatter,
							background: {
								opacity: 0.5
							}
						}
					}
				},
				legend: {
					show: false
				}
			});
		});

		$("#example-5").click(function () {

			placeholder.unbind();

			$("#pie-title").text("Label Styles #1");
			$("#pie-description").text("Semi-transparent, black-colored label background.");

			$.plot(placeholder, data, {
				series: {
					pie: {
						show  : true,
						radius: 1,
						label : {
							show      : true,
							radius    : 3 / 4,
							formatter : labelFormatter,
							background: {
								opacity: 0.5,
								color  : "#000"
							}
						}
					}
				},
				legend: {
					show: false
				}
			});
		});

		$("#example-6").click(function () {

			placeholder.unbind();

			$("#pie-title").text("Label Styles #2");
			$("#pie-description").text("Semi-transparent, black-colored label background placed at pie edge.");

			$.plot(placeholder, data, {
				series: {
					pie: {
						show  : true,
						radius: 3 / 4,
						label : {
							show      : true,
							radius    : 3 / 4,
							formatter : labelFormatter,
							background: {
								opacity: 0.5,
								color  : "#000"
							}
						}
					}
				},
				legend: {
					show: false
				}
			});
		});

		$("#example-7").click(function () {

			placeholder.unbind();

			$("#pie-title").text("Hidden Labels");
			$("#pie-description").text("Labels can be hidden if the slice is less than a given percentage of the pie (10% in this case).");

			$.plot(placeholder, data, {
				series: {
					pie: {
						show  : true,
						radius: 1,
						label : {
							show     : true,
							radius   : 2 / 3,
							formatter: labelFormatter,
							threshold: 0.1
						}
					}
				},
				legend: {
					show: false
				}
			});
		});

		$("#example-8").click(function () {

			placeholder.unbind();

			$("#pie-title").text("Combined Slice");
			$("#pie-description").text("Multiple slices less than a given percentage (5% in this case) of the pie can be combined into a single, larger slice.");

			$.plot(placeholder, data, {
				series: {
					pie: {
						show   : true,
						combine: {
							color    : "#999",
							threshold: 0.05
						}
					}
				},
				legend: {
					show: false
				}
			});
		});

		$("#example-9").click(function () {

			placeholder.unbind();

			$("#pie-title").text("Rectangular Pie");
			$("#pie-description").text("The radius can also be set to a specific size (even larger than the container itself).");

			$.plot(placeholder, data, {
				series: {
					pie: {
						show  : true,
						radius: 500,
						label : {
							show     : true,
							formatter: labelFormatter,
							threshold: 0.1
						}
					}
				},
				legend: {
					show: false
				}
			});
		});

		$("#example-10").click(function () {

			placeholder.unbind();

			$("#pie-title").text("Tilted Pie");
			$("#pie-description").text("The pie can be tilted at an angle.");

			$.plot(placeholder, data, {
				series: {
					pie: {
						show   : true,
						radius : 1,
						tilt   : 0.5,
						label  : {
							show      : true,
							radius    : 1,
							formatter : labelFormatter,
							background: {
								opacity: 0.8
							}
						},
						combine: {
							color    : "#999",
							threshold: 0.1
						}
					}
				},
				legend: {
					show: false
				}
			});
		});

		$("#example-11").click(function () {

			placeholder.unbind();

			$("#pie-title").text("Donut Hole");
			$("#pie-description").text("A donut hole can be added.");

			$.plot(placeholder, data, {
				series: {
					pie: {
						innerRadius: 0.5,
						show       : true
					}
				}
			});
		});

		$("#example-12").click(function () {

			placeholder.unbind();

			$("#pie-title").text("Interactivity");
			$("#pie-description").text("The pie can be made interactive with hover and click events.");

			$.plot(placeholder, data, {
				series: {
					pie: {
						show: true
					}
				},
				grid  : {
					hoverable: true,
					clickable: true
				}
			});

			placeholder.bind("plothover", function (event, pos, obj) {

				if (!obj) {
					return;
				}

				var percent = parseFloat(obj.series.percent).toFixed(2);
				$("#hover").html("<span style='font-weight:bold; color:" + obj.series.color + "'>" + obj.series.label + " (" + percent + "%)</span>");
			});

			placeholder.bind("plotclick", function (event, pos, obj) {

				if (!obj) {
					return;
				}

				percent = parseFloat(obj.series.percent).toFixed(2);
				alert("" + obj.series.label + ": " + percent + "%");
			});
		});

		// Show the initial default chart

		$("#example-1").click();

		// A custom label formatter used by several of the plots

		function labelFormatter(label, series) {
			return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
		}

		// Tracking
		var sin = [], cos = [];
		for (var i = 0; i < 14; i += 0.1) {
			sin.push([i, Math.sin(i)]);
			cos.push([i, Math.cos(i)]);
		}

		plot = $.plot("#chart-tracking", [
			{ data: sin, label: "sin(x) = -0.00"},
			{ data: cos, label: "cos(x) = -0.00" }
		], {
			series   : {
				lines: {
					show: true
				}
			},
			crosshair: {
				mode: "x"
			},
			grid     : {
				hoverable    : true,
				autoHighlight: false
			},
			yaxis    : {
				min: -1.2,
				max: 1.2
			}
		});

		var legends = $("#chart-tracking .legendLabel");

		legends.each(function () {
			// fix the widths so they don't jump around
			$(this).css('width', $(this).width());
		});

		var updateLegendTimeout = null;
		var latestPosition = null;

		function updateLegend() {

			updateLegendTimeout = null;

			var pos = latestPosition;

			var axes = plot.getAxes();
			if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
				pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
				return;
			}

			var i, j, dataset = plot.getData();
			for (i = 0; i < dataset.length; ++i) {

				var series = dataset[i];

				// Find the nearest points, x-wise

				for (j = 0; j < series.data.length; ++j) {
					if (series.data[j][0] > pos.x) {
						break;
					}
				}

				// Now Interpolate

				var y,
					p1 = series.data[j - 1],
					p2 = series.data[j];

				if (p1 == null) {
					y = p2[1];
				} else if (p2 == null) {
					y = p1[1];
				} else {
					y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
				}

				legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
			}
		}

		$("#chart-tracking").bind("plothover", function (event, pos, item) {
			latestPosition = pos;
			if (!updateLegendTimeout) {
				updateLegendTimeout = setTimeout(updateLegend, 50);
			}
		});

		// Stacking.
		var d1 = [];
		for (var i = 0; i <= 10; i += 1) {
			d1.push([i, parseInt(Math.random() * 30)]);
		}

		var d2 = [];
		for (var i = 0; i <= 10; i += 1) {
			d2.push([i, parseInt(Math.random() * 30)]);
		}

		var d3 = [];
		for (var i = 0; i <= 10; i += 1) {
			d3.push([i, parseInt(Math.random() * 30)]);
		}

		var stack = 0,
			bars = true,
			lines = false,
			steps = false;

		function plotWithOptions() {
			$.plot("#chart-stacking", [ d1, d2, d3 ], {
				series: {
					stack: stack,
					lines: {
						show : lines,
						fill : true,
						steps: steps
					},
					bars : {
						show    : bars,
						barWidth: 0.6
					}
				}
			});
		}

		plotWithOptions();

		$(".stackControls button").click(function (e) {
			e.preventDefault();
			stack = $(this).text() == "With stacking" ? true : null;
			plotWithOptions();
		});

		$(".graphControls button").click(function (e) {
			e.preventDefault();
			bars = $(this).text().indexOf("Bars") != -1;
			lines = $(this).text().indexOf("Lines") != -1;
			steps = $(this).text().indexOf("steps") != -1;
			plotWithOptions();
		});

		// Interactivity.
		var sin = [],
			cos = [];

		for (var i = 0; i < 14; i += 0.5) {
			sin.push([i, Math.sin(i)]);
			cos.push([i, Math.cos(i)]);
		}

		var plot2 = $.plot("#chart-interactivity", [
			{ data: sin, label: "sin(x)"},
			{ data: cos, label: "cos(x)"}
		], {
			series: {
				lines : {
					show: true
				},
				points: {
					show: true
				}
			},
			grid  : {
				hoverable: true,
				clickable: true
			},
			yaxis : {
				min: -1.2,
				max: 1.2
			}
		});

		function showTooltip(x, y, contents) {
			$("<div id='tooltip'>" + contents + "</div>").css({
				position          : "absolute",
				display           : "none",
				top               : y + 5,
				left              : x + 5,
				border            : "1px solid #fdd",
				padding           : "2px",
				"background-color": "#fee",
				opacity           : 0.80
			}).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#chart-interactivity").bind("plothover", function (event, pos, item) {
			if (item) {
				if (previousPoint != item.dataIndex) {

					previousPoint = item.dataIndex;

					$("#tooltip").remove();
					var x = item.datapoint[0].toFixed(2),
						y = item.datapoint[1].toFixed(2);

					showTooltip(item.pageX, item.pageY,
						item.series.label + " of " + x + " = " + y);
				}
			}
		});

		$("#chart-interactivity").bind("plotclick", function (event, pos, item) {
			if (item) {
				$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
				plot2.highlight(item.series, item.datapoint);
			}
		});

		// Multiple axes.
		var oilprices = [
			[1167692400000, 61.05],
			[1167778800000, 58.32],
			[1167865200000, 57.35],
			[1167951600000, 56.31],
			[1168210800000, 55.55],
			[1168297200000, 55.64],
			[1168383600000, 54.02],
			[1168470000000, 51.88],
			[1168556400000, 52.99],
			[1168815600000, 52.99],
			[1168902000000, 51.21],
			[1168988400000, 52.24],
			[1169074800000, 50.48],
			[1169161200000, 51.99],
			[1169420400000, 51.13],
			[1169506800000, 55.04],
			[1169593200000, 55.37],
			[1169679600000, 54.23],
			[1169766000000, 55.42],
			[1170025200000, 54.01],
			[1170111600000, 56.97],
			[1170198000000, 58.14],
			[1170284400000, 58.14],
			[1170370800000, 59.02],
			[1170630000000, 58.74],
			[1170716400000, 58.88],
			[1170802800000, 57.71],
			[1170889200000, 59.71],
			[1170975600000, 59.89],
			[1171234800000, 57.81],
			[1171321200000, 59.06],
			[1171407600000, 58.00],
			[1171494000000, 57.99],
			[1171580400000, 59.39],
			[1171839600000, 59.39],
			[1171926000000, 58.07],
			[1172012400000, 60.07],
			[1172098800000, 61.14],
			[1172444400000, 61.39],
			[1172530800000, 61.46],
			[1172617200000, 61.79],
			[1172703600000, 62.00],
			[1172790000000, 60.07],
			[1173135600000, 60.69],
			[1173222000000, 61.82],
			[1173308400000, 60.05],
			[1173654000000, 58.91],
			[1173740400000, 57.93],
			[1173826800000, 58.16],
			[1173913200000, 57.55],
			[1173999600000, 57.11],
			[1174258800000, 56.59],
			[1174345200000, 59.61],
			[1174518000000, 61.69],
			[1174604400000, 62.28],
			[1174860000000, 62.91],
			[1174946400000, 62.93],
			[1175032800000, 64.03],
			[1175119200000, 66.03],
			[1175205600000, 65.87],
			[1175464800000, 64.64],
			[1175637600000, 64.38],
			[1175724000000, 64.28],
			[1175810400000, 64.28],
			[1176069600000, 61.51],
			[1176156000000, 61.89],
			[1176242400000, 62.01],
			[1176328800000, 63.85],
			[1176415200000, 63.63],
			[1176674400000, 63.61],
			[1176760800000, 63.10],
			[1176847200000, 63.13],
			[1176933600000, 61.83],
			[1177020000000, 63.38],
			[1177279200000, 64.58],
			[1177452000000, 65.84],
			[1177538400000, 65.06],
			[1177624800000, 66.46],
			[1177884000000, 64.40],
			[1178056800000, 63.68],
			[1178143200000, 63.19],
			[1178229600000, 61.93],
			[1178488800000, 61.47],
			[1178575200000, 61.55],
			[1178748000000, 61.81],
			[1178834400000, 62.37],
			[1179093600000, 62.46],
			[1179180000000, 63.17],
			[1179266400000, 62.55],
			[1179352800000, 64.94],
			[1179698400000, 66.27],
			[1179784800000, 65.50],
			[1179871200000, 65.77],
			[1179957600000, 64.18],
			[1180044000000, 65.20],
			[1180389600000, 63.15],
			[1180476000000, 63.49],
			[1180562400000, 65.08],
			[1180908000000, 66.30],
			[1180994400000, 65.96],
			[1181167200000, 66.93],
			[1181253600000, 65.98],
			[1181599200000, 65.35],
			[1181685600000, 66.26],
			[1181858400000, 68.00],
			[1182117600000, 69.09],
			[1182204000000, 69.10],
			[1182290400000, 68.19],
			[1182376800000, 68.19],
			[1182463200000, 69.14],
			[1182722400000, 68.19],
			[1182808800000, 67.77],
			[1182895200000, 68.97],
			[1182981600000, 69.57],
			[1183068000000, 70.68],
			[1183327200000, 71.09],
			[1183413600000, 70.92],
			[1183586400000, 71.81],
			[1183672800000, 72.81],
			[1183932000000, 72.19],
			[1184018400000, 72.56],
			[1184191200000, 72.50],
			[1184277600000, 74.15],
			[1184623200000, 75.05],
			[1184796000000, 75.92],
			[1184882400000, 75.57],
			[1185141600000, 74.89],
			[1185228000000, 73.56],
			[1185314400000, 75.57],
			[1185400800000, 74.95],
			[1185487200000, 76.83],
			[1185832800000, 78.21],
			[1185919200000, 76.53],
			[1186005600000, 76.86],
			[1186092000000, 76.00],
			[1186437600000, 71.59],
			[1186696800000, 71.47],
			[1186956000000, 71.62],
			[1187042400000, 71.00],
			[1187301600000, 71.98],
			[1187560800000, 71.12],
			[1187647200000, 69.47],
			[1187733600000, 69.26],
			[1187820000000, 69.83],
			[1187906400000, 71.09],
			[1188165600000, 71.73],
			[1188338400000, 73.36],
			[1188511200000, 74.04],
			[1188856800000, 76.30],
			[1189116000000, 77.49],
			[1189461600000, 78.23],
			[1189548000000, 79.91],
			[1189634400000, 80.09],
			[1189720800000, 79.10],
			[1189980000000, 80.57],
			[1190066400000, 81.93],
			[1190239200000, 83.32],
			[1190325600000, 81.62],
			[1190584800000, 80.95],
			[1190671200000, 79.53],
			[1190757600000, 80.30],
			[1190844000000, 82.88],
			[1190930400000, 81.66],
			[1191189600000, 80.24],
			[1191276000000, 80.05],
			[1191362400000, 79.94],
			[1191448800000, 81.44],
			[1191535200000, 81.22],
			[1191794400000, 79.02],
			[1191880800000, 80.26],
			[1191967200000, 80.30],
			[1192053600000, 83.08],
			[1192140000000, 83.69],
			[1192399200000, 86.13],
			[1192485600000, 87.61],
			[1192572000000, 87.40],
			[1192658400000, 89.47],
			[1192744800000, 88.60],
			[1193004000000, 87.56],
			[1193090400000, 87.56],
			[1193176800000, 87.10],
			[1193263200000, 91.86],
			[1193612400000, 93.53],
			[1193698800000, 94.53],
			[1193871600000, 95.93],
			[1194217200000, 93.98],
			[1194303600000, 96.37],
			[1194476400000, 95.46],
			[1194562800000, 96.32],
			[1195081200000, 93.43],
			[1195167600000, 95.10],
			[1195426800000, 94.64],
			[1195513200000, 95.10],
			[1196031600000, 97.70],
			[1196118000000, 94.42],
			[1196204400000, 90.62],
			[1196290800000, 91.01],
			[1196377200000, 88.71],
			[1196636400000, 88.32],
			[1196809200000, 90.23],
			[1196982000000, 88.28],
			[1197241200000, 87.86],
			[1197327600000, 90.02],
			[1197414000000, 92.25],
			[1197586800000, 90.63],
			[1197846000000, 90.63],
			[1197932400000, 90.49],
			[1198018800000, 91.24],
			[1198105200000, 91.06],
			[1198191600000, 90.49],
			[1198710000000, 96.62],
			[1198796400000, 96.00],
			[1199142000000, 99.62],
			[1199314800000, 99.18],
			[1199401200000, 95.09],
			[1199660400000, 96.33],
			[1199833200000, 95.67],
			[1200351600000, 91.90],
			[1200438000000, 90.84],
			[1200524400000, 90.13],
			[1200610800000, 90.57],
			[1200956400000, 89.21],
			[1201042800000, 86.99],
			[1201129200000, 89.85],
			[1201474800000, 90.99],
			[1201561200000, 91.64],
			[1201647600000, 92.33],
			[1201734000000, 91.75],
			[1202079600000, 90.02],
			[1202166000000, 88.41],
			[1202252400000, 87.14],
			[1202338800000, 88.11],
			[1202425200000, 91.77],
			[1202770800000, 92.78],
			[1202857200000, 93.27],
			[1202943600000, 95.46],
			[1203030000000, 95.46],
			[1203289200000, 101.74],
			[1203462000000, 98.81],
			[1203894000000, 100.88],
			[1204066800000, 99.64],
			[1204153200000, 102.59],
			[1204239600000, 101.84],
			[1204498800000, 99.52],
			[1204585200000, 99.52],
			[1204671600000, 104.52],
			[1204758000000, 105.47],
			[1204844400000, 105.15],
			[1205103600000, 108.75],
			[1205276400000, 109.92],
			[1205362800000, 110.33],
			[1205449200000, 110.21],
			[1205708400000, 105.68],
			[1205967600000, 101.84],
			[1206313200000, 100.86],
			[1206399600000, 101.22],
			[1206486000000, 105.90],
			[1206572400000, 107.58],
			[1206658800000, 105.62],
			[1206914400000, 101.58],
			[1207000800000, 100.98],
			[1207173600000, 103.83],
			[1207260000000, 106.23],
			[1207605600000, 108.50],
			[1207778400000, 110.11],
			[1207864800000, 110.14],
			[1208210400000, 113.79],
			[1208296800000, 114.93],
			[1208383200000, 114.86],
			[1208728800000, 117.48],
			[1208815200000, 118.30],
			[1208988000000, 116.06],
			[1209074400000, 118.52],
			[1209333600000, 118.75],
			[1209420000000, 113.46],
			[1209592800000, 112.52],
			[1210024800000, 121.84],
			[1210111200000, 123.53],
			[1210197600000, 123.69],
			[1210543200000, 124.23],
			[1210629600000, 125.80],
			[1210716000000, 126.29],
			[1211148000000, 127.05],
			[1211320800000, 129.07],
			[1211493600000, 132.19],
			[1211839200000, 128.85],
			[1212357600000, 127.76],
			[1212703200000, 138.54],
			[1212962400000, 136.80],
			[1213135200000, 136.38],
			[1213308000000, 134.86],
			[1213653600000, 134.01],
			[1213740000000, 136.68],
			[1213912800000, 135.65],
			[1214172000000, 134.62],
			[1214258400000, 134.62],
			[1214344800000, 134.62],
			[1214431200000, 139.64],
			[1214517600000, 140.21],
			[1214776800000, 140.00],
			[1214863200000, 140.97],
			[1214949600000, 143.57],
			[1215036000000, 145.29],
			[1215381600000, 141.37],
			[1215468000000, 136.04],
			[1215727200000, 146.40],
			[1215986400000, 145.18],
			[1216072800000, 138.74],
			[1216159200000, 134.60],
			[1216245600000, 129.29],
			[1216332000000, 130.65],
			[1216677600000, 127.95],
			[1216850400000, 127.95],
			[1217282400000, 122.19],
			[1217455200000, 124.08],
			[1217541600000, 125.10],
			[1217800800000, 121.41],
			[1217887200000, 119.17],
			[1217973600000, 118.58],
			[1218060000000, 120.02],
			[1218405600000, 114.45],
			[1218492000000, 113.01],
			[1218578400000, 116.00],
			[1218751200000, 113.77],
			[1219010400000, 112.87],
			[1219096800000, 114.53],
			[1219269600000, 114.98],
			[1219356000000, 114.98],
			[1219701600000, 116.27],
			[1219788000000, 118.15],
			[1219874400000, 115.59],
			[1219960800000, 115.46],
			[1220306400000, 109.71],
			[1220392800000, 109.35],
			[1220565600000, 106.23],
			[1220824800000, 106.34]
		];

		var exchangerates = [
			[1167606000000, 0.7580],
			[1167692400000, 0.7580],
			[1167778800000, 0.75470],
			[1167865200000, 0.75490],
			[1167951600000, 0.76130],
			[1168038000000, 0.76550],
			[1168124400000, 0.76930],
			[1168210800000, 0.76940],
			[1168297200000, 0.76880],
			[1168383600000, 0.76780],
			[1168470000000, 0.77080],
			[1168556400000, 0.77270],
			[1168642800000, 0.77490],
			[1168729200000, 0.77410],
			[1168815600000, 0.77410],
			[1168902000000, 0.77320],
			[1168988400000, 0.77270],
			[1169074800000, 0.77370],
			[1169161200000, 0.77240],
			[1169247600000, 0.77120],
			[1169334000000, 0.7720],
			[1169420400000, 0.77210],
			[1169506800000, 0.77170],
			[1169593200000, 0.77040],
			[1169679600000, 0.7690],
			[1169766000000, 0.77110],
			[1169852400000, 0.7740],
			[1169938800000, 0.77450],
			[1170025200000, 0.77450],
			[1170111600000, 0.7740],
			[1170198000000, 0.77160],
			[1170284400000, 0.77130],
			[1170370800000, 0.76780],
			[1170457200000, 0.76880],
			[1170543600000, 0.77180],
			[1170630000000, 0.77180],
			[1170716400000, 0.77280],
			[1170802800000, 0.77290],
			[1170889200000, 0.76980],
			[1170975600000, 0.76850],
			[1171062000000, 0.76810],
			[1171148400000, 0.7690],
			[1171234800000, 0.7690],
			[1171321200000, 0.76980],
			[1171407600000, 0.76990],
			[1171494000000, 0.76510],
			[1171580400000, 0.76130],
			[1171666800000, 0.76160],
			[1171753200000, 0.76140],
			[1171839600000, 0.76140],
			[1171926000000, 0.76070],
			[1172012400000, 0.76020],
			[1172098800000, 0.76110],
			[1172185200000, 0.76220],
			[1172271600000, 0.76150],
			[1172358000000, 0.75980],
			[1172444400000, 0.75980],
			[1172530800000, 0.75920],
			[1172617200000, 0.75730],
			[1172703600000, 0.75660],
			[1172790000000, 0.75670],
			[1172876400000, 0.75910],
			[1172962800000, 0.75820],
			[1173049200000, 0.75850],
			[1173135600000, 0.76130],
			[1173222000000, 0.76310],
			[1173308400000, 0.76150],
			[1173394800000, 0.760],
			[1173481200000, 0.76130],
			[1173567600000, 0.76270],
			[1173654000000, 0.76270],
			[1173740400000, 0.76080],
			[1173826800000, 0.75830],
			[1173913200000, 0.75750],
			[1173999600000, 0.75620],
			[1174086000000, 0.7520],
			[1174172400000, 0.75120],
			[1174258800000, 0.75120],
			[1174345200000, 0.75170],
			[1174431600000, 0.7520],
			[1174518000000, 0.75110],
			[1174604400000, 0.7480],
			[1174690800000, 0.75090],
			[1174777200000, 0.75310],
			[1174860000000, 0.75310],
			[1174946400000, 0.75270],
			[1175032800000, 0.74980],
			[1175119200000, 0.74930],
			[1175205600000, 0.75040],
			[1175292000000, 0.750],
			[1175378400000, 0.74910],
			[1175464800000, 0.74910],
			[1175551200000, 0.74850],
			[1175637600000, 0.74840],
			[1175724000000, 0.74920],
			[1175810400000, 0.74710],
			[1175896800000, 0.74590],
			[1175983200000, 0.74770],
			[1176069600000, 0.74770],
			[1176156000000, 0.74830],
			[1176242400000, 0.74580],
			[1176328800000, 0.74480],
			[1176415200000, 0.7430],
			[1176501600000, 0.73990],
			[1176588000000, 0.73950],
			[1176674400000, 0.73950],
			[1176760800000, 0.73780],
			[1176847200000, 0.73820],
			[1176933600000, 0.73620],
			[1177020000000, 0.73550],
			[1177106400000, 0.73480],
			[1177192800000, 0.73610],
			[1177279200000, 0.73610],
			[1177365600000, 0.73650],
			[1177452000000, 0.73620],
			[1177538400000, 0.73310],
			[1177624800000, 0.73390],
			[1177711200000, 0.73440],
			[1177797600000, 0.73270],
			[1177884000000, 0.73270],
			[1177970400000, 0.73360],
			[1178056800000, 0.73330],
			[1178143200000, 0.73590],
			[1178229600000, 0.73590],
			[1178316000000, 0.73720],
			[1178402400000, 0.7360],
			[1178488800000, 0.7360],
			[1178575200000, 0.7350],
			[1178661600000, 0.73650],
			[1178748000000, 0.73840],
			[1178834400000, 0.73950],
			[1178920800000, 0.74130],
			[1179007200000, 0.73970],
			[1179093600000, 0.73960],
			[1179180000000, 0.73850],
			[1179266400000, 0.73780],
			[1179352800000, 0.73660],
			[1179439200000, 0.740],
			[1179525600000, 0.74110],
			[1179612000000, 0.74060],
			[1179698400000, 0.74050],
			[1179784800000, 0.74140],
			[1179871200000, 0.74310],
			[1179957600000, 0.74310],
			[1180044000000, 0.74380],
			[1180130400000, 0.74430],
			[1180216800000, 0.74430],
			[1180303200000, 0.74430],
			[1180389600000, 0.74340],
			[1180476000000, 0.74290],
			[1180562400000, 0.74420],
			[1180648800000, 0.7440],
			[1180735200000, 0.74390],
			[1180821600000, 0.74370],
			[1180908000000, 0.74370],
			[1180994400000, 0.74290],
			[1181080800000, 0.74030],
			[1181167200000, 0.73990],
			[1181253600000, 0.74180],
			[1181340000000, 0.74680],
			[1181426400000, 0.7480],
			[1181512800000, 0.7480],
			[1181599200000, 0.7490],
			[1181685600000, 0.74940],
			[1181772000000, 0.75220],
			[1181858400000, 0.75150],
			[1181944800000, 0.75020],
			[1182031200000, 0.74720],
			[1182117600000, 0.74720],
			[1182204000000, 0.74620],
			[1182290400000, 0.74550],
			[1182376800000, 0.74490],
			[1182463200000, 0.74670],
			[1182549600000, 0.74580],
			[1182636000000, 0.74270],
			[1182722400000, 0.74270],
			[1182808800000, 0.7430],
			[1182895200000, 0.74290],
			[1182981600000, 0.7440],
			[1183068000000, 0.7430],
			[1183154400000, 0.74220],
			[1183240800000, 0.73880],
			[1183327200000, 0.73880],
			[1183413600000, 0.73690],
			[1183500000000, 0.73450],
			[1183586400000, 0.73450],
			[1183672800000, 0.73450],
			[1183759200000, 0.73520],
			[1183845600000, 0.73410],
			[1183932000000, 0.73410],
			[1184018400000, 0.7340],
			[1184104800000, 0.73240],
			[1184191200000, 0.72720],
			[1184277600000, 0.72640],
			[1184364000000, 0.72550],
			[1184450400000, 0.72580],
			[1184536800000, 0.72580],
			[1184623200000, 0.72560],
			[1184709600000, 0.72570],
			[1184796000000, 0.72470],
			[1184882400000, 0.72430],
			[1184968800000, 0.72440],
			[1185055200000, 0.72350],
			[1185141600000, 0.72350],
			[1185228000000, 0.72350],
			[1185314400000, 0.72350],
			[1185400800000, 0.72620],
			[1185487200000, 0.72880],
			[1185573600000, 0.73010],
			[1185660000000, 0.73370],
			[1185746400000, 0.73370],
			[1185832800000, 0.73240],
			[1185919200000, 0.72970],
			[1186005600000, 0.73170],
			[1186092000000, 0.73150],
			[1186178400000, 0.72880],
			[1186264800000, 0.72630],
			[1186351200000, 0.72630],
			[1186437600000, 0.72420],
			[1186524000000, 0.72530],
			[1186610400000, 0.72640],
			[1186696800000, 0.7270],
			[1186783200000, 0.73120],
			[1186869600000, 0.73050],
			[1186956000000, 0.73050],
			[1187042400000, 0.73180],
			[1187128800000, 0.73580],
			[1187215200000, 0.74090],
			[1187301600000, 0.74540],
			[1187388000000, 0.74370],
			[1187474400000, 0.74240],
			[1187560800000, 0.74240],
			[1187647200000, 0.74150],
			[1187733600000, 0.74190],
			[1187820000000, 0.74140],
			[1187906400000, 0.73770],
			[1187992800000, 0.73550],
			[1188079200000, 0.73150],
			[1188165600000, 0.73150],
			[1188252000000, 0.7320],
			[1188338400000, 0.73320],
			[1188424800000, 0.73460],
			[1188511200000, 0.73280],
			[1188597600000, 0.73230],
			[1188684000000, 0.7340],
			[1188770400000, 0.7340],
			[1188856800000, 0.73360],
			[1188943200000, 0.73510],
			[1189029600000, 0.73460],
			[1189116000000, 0.73210],
			[1189202400000, 0.72940],
			[1189288800000, 0.72660],
			[1189375200000, 0.72660],
			[1189461600000, 0.72540],
			[1189548000000, 0.72420],
			[1189634400000, 0.72130],
			[1189720800000, 0.71970],
			[1189807200000, 0.72090],
			[1189893600000, 0.7210],
			[1189980000000, 0.7210],
			[1190066400000, 0.7210],
			[1190152800000, 0.72090],
			[1190239200000, 0.71590],
			[1190325600000, 0.71330],
			[1190412000000, 0.71050],
			[1190498400000, 0.70990],
			[1190584800000, 0.70990],
			[1190671200000, 0.70930],
			[1190757600000, 0.70930],
			[1190844000000, 0.70760],
			[1190930400000, 0.7070],
			[1191016800000, 0.70490],
			[1191103200000, 0.70120],
			[1191189600000, 0.70110],
			[1191276000000, 0.70190],
			[1191362400000, 0.70460],
			[1191448800000, 0.70630],
			[1191535200000, 0.70890],
			[1191621600000, 0.70770],
			[1191708000000, 0.70770],
			[1191794400000, 0.70770],
			[1191880800000, 0.70910],
			[1191967200000, 0.71180],
			[1192053600000, 0.70790],
			[1192140000000, 0.70530],
			[1192226400000, 0.7050],
			[1192312800000, 0.70550],
			[1192399200000, 0.70550],
			[1192485600000, 0.70450],
			[1192572000000, 0.70510],
			[1192658400000, 0.70510],
			[1192744800000, 0.70170],
			[1192831200000, 0.70],
			[1192917600000, 0.69950],
			[1193004000000, 0.69940],
			[1193090400000, 0.70140],
			[1193176800000, 0.70360],
			[1193263200000, 0.70210],
			[1193349600000, 0.70020],
			[1193436000000, 0.69670],
			[1193522400000, 0.6950],
			[1193612400000, 0.6950],
			[1193698800000, 0.69390],
			[1193785200000, 0.6940],
			[1193871600000, 0.69220],
			[1193958000000, 0.69190],
			[1194044400000, 0.69140],
			[1194130800000, 0.68940],
			[1194217200000, 0.68910],
			[1194303600000, 0.69040],
			[1194390000000, 0.6890],
			[1194476400000, 0.68340],
			[1194562800000, 0.68230],
			[1194649200000, 0.68070],
			[1194735600000, 0.68150],
			[1194822000000, 0.68150],
			[1194908400000, 0.68470],
			[1194994800000, 0.68590],
			[1195081200000, 0.68220],
			[1195167600000, 0.68270],
			[1195254000000, 0.68370],
			[1195340400000, 0.68230],
			[1195426800000, 0.68220],
			[1195513200000, 0.68220],
			[1195599600000, 0.67920],
			[1195686000000, 0.67460],
			[1195772400000, 0.67350],
			[1195858800000, 0.67310],
			[1195945200000, 0.67420],
			[1196031600000, 0.67440],
			[1196118000000, 0.67390],
			[1196204400000, 0.67310],
			[1196290800000, 0.67610],
			[1196377200000, 0.67610],
			[1196463600000, 0.67850],
			[1196550000000, 0.68180],
			[1196636400000, 0.68360],
			[1196722800000, 0.68230],
			[1196809200000, 0.68050],
			[1196895600000, 0.67930],
			[1196982000000, 0.68490],
			[1197068400000, 0.68330],
			[1197154800000, 0.68250],
			[1197241200000, 0.68250],
			[1197327600000, 0.68160],
			[1197414000000, 0.67990],
			[1197500400000, 0.68130],
			[1197586800000, 0.68090],
			[1197673200000, 0.68680],
			[1197759600000, 0.69330],
			[1197846000000, 0.69330],
			[1197932400000, 0.69450],
			[1198018800000, 0.69440],
			[1198105200000, 0.69460],
			[1198191600000, 0.69640],
			[1198278000000, 0.69650],
			[1198364400000, 0.69560],
			[1198450800000, 0.69560],
			[1198537200000, 0.6950],
			[1198623600000, 0.69480],
			[1198710000000, 0.69280],
			[1198796400000, 0.68870],
			[1198882800000, 0.68240],
			[1198969200000, 0.67940],
			[1199055600000, 0.67940],
			[1199142000000, 0.68030],
			[1199228400000, 0.68550],
			[1199314800000, 0.68240],
			[1199401200000, 0.67910],
			[1199487600000, 0.67830],
			[1199574000000, 0.67850],
			[1199660400000, 0.67850],
			[1199746800000, 0.67970],
			[1199833200000, 0.680],
			[1199919600000, 0.68030],
			[1200006000000, 0.68050],
			[1200092400000, 0.6760],
			[1200178800000, 0.6770],
			[1200265200000, 0.6770],
			[1200351600000, 0.67360],
			[1200438000000, 0.67260],
			[1200524400000, 0.67640],
			[1200610800000, 0.68210],
			[1200697200000, 0.68310],
			[1200783600000, 0.68420],
			[1200870000000, 0.68420],
			[1200956400000, 0.68870],
			[1201042800000, 0.69030],
			[1201129200000, 0.68480],
			[1201215600000, 0.68240],
			[1201302000000, 0.67880],
			[1201388400000, 0.68140],
			[1201474800000, 0.68140],
			[1201561200000, 0.67970],
			[1201647600000, 0.67690],
			[1201734000000, 0.67650],
			[1201820400000, 0.67330],
			[1201906800000, 0.67290],
			[1201993200000, 0.67580],
			[1202079600000, 0.67580],
			[1202166000000, 0.6750],
			[1202252400000, 0.6780],
			[1202338800000, 0.68330],
			[1202425200000, 0.68560],
			[1202511600000, 0.69030],
			[1202598000000, 0.68960],
			[1202684400000, 0.68960],
			[1202770800000, 0.68820],
			[1202857200000, 0.68790],
			[1202943600000, 0.68620],
			[1203030000000, 0.68520],
			[1203116400000, 0.68230],
			[1203202800000, 0.68130],
			[1203289200000, 0.68130],
			[1203375600000, 0.68220],
			[1203462000000, 0.68020],
			[1203548400000, 0.68020],
			[1203634800000, 0.67840],
			[1203721200000, 0.67480],
			[1203807600000, 0.67470],
			[1203894000000, 0.67470],
			[1203980400000, 0.67480],
			[1204066800000, 0.67330],
			[1204153200000, 0.6650],
			[1204239600000, 0.66110],
			[1204326000000, 0.65830],
			[1204412400000, 0.6590],
			[1204498800000, 0.6590],
			[1204585200000, 0.65810],
			[1204671600000, 0.65780],
			[1204758000000, 0.65740],
			[1204844400000, 0.65320],
			[1204930800000, 0.65020],
			[1205017200000, 0.65140],
			[1205103600000, 0.65140],
			[1205190000000, 0.65070],
			[1205276400000, 0.6510],
			[1205362800000, 0.64890],
			[1205449200000, 0.64240],
			[1205535600000, 0.64060],
			[1205622000000, 0.63820],
			[1205708400000, 0.63820],
			[1205794800000, 0.63410],
			[1205881200000, 0.63440],
			[1205967600000, 0.63780],
			[1206054000000, 0.64390],
			[1206140400000, 0.64780],
			[1206226800000, 0.64810],
			[1206313200000, 0.64810],
			[1206399600000, 0.64940],
			[1206486000000, 0.64380],
			[1206572400000, 0.63770],
			[1206658800000, 0.63290],
			[1206745200000, 0.63360],
			[1206831600000, 0.63330],
			[1206914400000, 0.63330],
			[1207000800000, 0.6330],
			[1207087200000, 0.63710],
			[1207173600000, 0.64030],
			[1207260000000, 0.63960],
			[1207346400000, 0.63640],
			[1207432800000, 0.63560],
			[1207519200000, 0.63560],
			[1207605600000, 0.63680],
			[1207692000000, 0.63570],
			[1207778400000, 0.63540],
			[1207864800000, 0.6320],
			[1207951200000, 0.63320],
			[1208037600000, 0.63280],
			[1208124000000, 0.63310],
			[1208210400000, 0.63420],
			[1208296800000, 0.63210],
			[1208383200000, 0.63020],
			[1208469600000, 0.62780],
			[1208556000000, 0.63080],
			[1208642400000, 0.63240],
			[1208728800000, 0.63240],
			[1208815200000, 0.63070],
			[1208901600000, 0.62770],
			[1208988000000, 0.62690],
			[1209074400000, 0.63350],
			[1209160800000, 0.63920],
			[1209247200000, 0.640],
			[1209333600000, 0.64010],
			[1209420000000, 0.63960],
			[1209506400000, 0.64070],
			[1209592800000, 0.64230],
			[1209679200000, 0.64290],
			[1209765600000, 0.64720],
			[1209852000000, 0.64850],
			[1209938400000, 0.64860],
			[1210024800000, 0.64670],
			[1210111200000, 0.64440],
			[1210197600000, 0.64670],
			[1210284000000, 0.65090],
			[1210370400000, 0.64780],
			[1210456800000, 0.64610],
			[1210543200000, 0.64610],
			[1210629600000, 0.64680],
			[1210716000000, 0.64490],
			[1210802400000, 0.6470],
			[1210888800000, 0.64610],
			[1210975200000, 0.64520],
			[1211061600000, 0.64220],
			[1211148000000, 0.64220],
			[1211234400000, 0.64250],
			[1211320800000, 0.64140],
			[1211407200000, 0.63660],
			[1211493600000, 0.63460],
			[1211580000000, 0.6350],
			[1211666400000, 0.63460],
			[1211752800000, 0.63460],
			[1211839200000, 0.63430],
			[1211925600000, 0.63460],
			[1212012000000, 0.63790],
			[1212098400000, 0.64160],
			[1212184800000, 0.64420],
			[1212271200000, 0.64310],
			[1212357600000, 0.64310],
			[1212444000000, 0.64350],
			[1212530400000, 0.6440],
			[1212616800000, 0.64730],
			[1212703200000, 0.64690],
			[1212789600000, 0.63860],
			[1212876000000, 0.63560],
			[1212962400000, 0.6340],
			[1213048800000, 0.63460],
			[1213135200000, 0.6430],
			[1213221600000, 0.64520],
			[1213308000000, 0.64670],
			[1213394400000, 0.65060],
			[1213480800000, 0.65040],
			[1213567200000, 0.65030],
			[1213653600000, 0.64810],
			[1213740000000, 0.64510],
			[1213826400000, 0.6450],
			[1213912800000, 0.64410],
			[1213999200000, 0.64140],
			[1214085600000, 0.64090],
			[1214172000000, 0.64090],
			[1214258400000, 0.64280],
			[1214344800000, 0.64310],
			[1214431200000, 0.64180],
			[1214517600000, 0.63710],
			[1214604000000, 0.63490],
			[1214690400000, 0.63330],
			[1214776800000, 0.63340],
			[1214863200000, 0.63380],
			[1214949600000, 0.63420],
			[1215036000000, 0.6320],
			[1215122400000, 0.63180],
			[1215208800000, 0.6370],
			[1215295200000, 0.63680],
			[1215381600000, 0.63680],
			[1215468000000, 0.63830],
			[1215554400000, 0.63710],
			[1215640800000, 0.63710],
			[1215727200000, 0.63550],
			[1215813600000, 0.6320],
			[1215900000000, 0.62770],
			[1215986400000, 0.62760],
			[1216072800000, 0.62910],
			[1216159200000, 0.62740],
			[1216245600000, 0.62930],
			[1216332000000, 0.63110],
			[1216418400000, 0.6310],
			[1216504800000, 0.63120],
			[1216591200000, 0.63120],
			[1216677600000, 0.63040],
			[1216764000000, 0.62940],
			[1216850400000, 0.63480],
			[1216936800000, 0.63780],
			[1217023200000, 0.63680],
			[1217109600000, 0.63680],
			[1217196000000, 0.63680],
			[1217282400000, 0.6360],
			[1217368800000, 0.6370],
			[1217455200000, 0.64180],
			[1217541600000, 0.64110],
			[1217628000000, 0.64350],
			[1217714400000, 0.64270],
			[1217800800000, 0.64270],
			[1217887200000, 0.64190],
			[1217973600000, 0.64460],
			[1218060000000, 0.64680],
			[1218146400000, 0.64870],
			[1218232800000, 0.65940],
			[1218319200000, 0.66660],
			[1218405600000, 0.66660],
			[1218492000000, 0.66780],
			[1218578400000, 0.67120],
			[1218664800000, 0.67050],
			[1218751200000, 0.67180],
			[1218837600000, 0.67840],
			[1218924000000, 0.68110],
			[1219010400000, 0.68110],
			[1219096800000, 0.67940],
			[1219183200000, 0.68040],
			[1219269600000, 0.67810],
			[1219356000000, 0.67560],
			[1219442400000, 0.67350],
			[1219528800000, 0.67630],
			[1219615200000, 0.67620],
			[1219701600000, 0.67770],
			[1219788000000, 0.68150],
			[1219874400000, 0.68020],
			[1219960800000, 0.6780],
			[1220047200000, 0.67960],
			[1220133600000, 0.68170],
			[1220220000000, 0.68170],
			[1220306400000, 0.68320],
			[1220392800000, 0.68770],
			[1220479200000, 0.69120],
			[1220565600000, 0.69140],
			[1220652000000, 0.70090],
			[1220738400000, 0.70120],
			[1220824800000, 0.7010],
			[1220911200000, 0.70050]
		];

		function euroFormatter(v, axis) {
			return v.toFixed(axis.tickDecimals) + "€";
		}

		function doPlot(position) {
			$.plot("#chart-multiple", [
				{ data: oilprices, label: "Oil price ($)" },
				{ data: exchangerates, label: "USD/EUR exchange rate", yaxis: 2 }
			], {
				xaxes : [
					{ mode: "time" }
				],
				yaxes : [
					{ min: 0 },
					{
						// align if we are to the right
						alignTicksWithAxis: position == "right" ? 1 : null,
						position          : position,
						tickFormatter     : euroFormatter
					}
				],
				legend: { position: "sw" }
			});
		}

		doPlot("right");

		// Navigation.
		// generate data set from a parametric function with a fractal look

		function sumf(f, t, m) {
			var res = 0;
			for (var i = 1; i < m; ++i) {
				res += f(i * i * t) / (i * i);
			}
			return res;
		}

		var d1 = [];
		for (var t = 0; t <= 2 * Math.PI; t += 0.01) {
			d1.push([sumf(Math.cos, t, 10), sumf(Math.sin, t, 10)]);
		}

		var data = [ d1 ],
			placeholder = $("#chart-navigation");

		var plot = $.plot(placeholder, data, {
			series: {
				lines     : {
					show: true
				},
				shadowSize: 0
			},
			xaxis : {
				zoomRange: [0.1, 10],
				panRange : [-10, 10]
			},
			yaxis : {
				zoomRange: [0.1, 10],
				panRange : [-10, 10]
			},
			zoom  : {
				interactive: true
			},
			pan   : {
				interactive: true
			}
		});

		// show pan/zoom messages to illustrate events

		placeholder.bind("plotpan", function (event, plot) {
			var axes = plot.getAxes();
			$(".message").html("Panning to x: " + axes.xaxis.min.toFixed(2)
				+ " &ndash; " + axes.xaxis.max.toFixed(2)
				+ " and y: " + axes.yaxis.min.toFixed(2)
				+ " &ndash; " + axes.yaxis.max.toFixed(2));
		});

		placeholder.bind("plotzoom", function (event, plot) {
			var axes = plot.getAxes();
			$(".message").html("Zooming to x: " + axes.xaxis.min.toFixed(2)
				+ " &ndash; " + axes.xaxis.max.toFixed(2)
				+ " and y: " + axes.yaxis.min.toFixed(2)
				+ " &ndash; " + axes.yaxis.max.toFixed(2));
		});

		// add zoom out button

		$("<div class='button' style='right:20px;top:20px'>zoom out</div>")
			.appendTo(placeholder)
			.click(function (event) {
				event.preventDefault();
				plot.zoomOut();
			});

		// and add panning buttons

		// little helper for taking the repetitive work out of placing
		// panning arrows

		function addArrow(dir, right, top, offset) {
			$("<img class='button' src='/js/vendor/jquery-flot/images/arrow-" + dir + ".gif' style='right:" + right + "px;top:" + top + "px'>")
				.appendTo(placeholder)
				.click(function (e) {
					e.preventDefault();
					plot.pan(offset);
				});
		}

		addArrow("left", 55, 60, { left: -100 });
		addArrow("right", 25, 60, { left: 100 });
		addArrow("up", 40, 45, { top: -100 });
		addArrow("down", 40, 75, { top: 100 });

		// Selection & Zooming.
		// setup plot

		function getData(x1, x2) {

			var d = [];
			for (var i = 0; i <= 100; ++i) {
				var x = x1 + i * (x2 - x1) / 100;
				d.push([x, Math.sin(x * Math.sin(x))]);
			}

			return [
				{ label: "sin(x sin(x))", data: d }
			];
		}

		var options = {
			legend   : {
				show: false
			},
			series   : {
				lines : {
					show: true
				},
				points: {
					show: true
				}
			},
			yaxis    : {
				ticks: 10
			},
			selection: {
				mode: "xy"
			}
		};

		var startData = getData(0, 3 * Math.PI);

		var plot = $.plot("#chart-zooming", startData, options);

		// Create the overview plot

		var overview = $.plot("#overview", startData, {
			legend   : {
				show: false
			},
			series   : {
				lines     : {
					show     : true,
					lineWidth: 1
				},
				shadowSize: 0
			},
			xaxis    : {
				ticks: 4
			},
			yaxis    : {
				ticks: 3,
				min  : -2,
				max  : 2
			},
			grid     : {
				color: "#999"
			},
			selection: {
				mode: "xy"
			}
		});

		// now connect the two

		$("#chart-zooming").bind("plotselected", function (event, ranges) {

			// clamp the zooming to prevent eternal zoom

			if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
				ranges.xaxis.to = ranges.xaxis.from + 0.00001;
			}

			if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
				ranges.yaxis.to = ranges.yaxis.from + 0.00001;
			}

			// do the zooming

			plot = $.plot("#chart-zooming", getData(ranges.xaxis.from, ranges.xaxis.to),
				$.extend(true, {}, options, {
					xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
					yaxis: { min: ranges.yaxis.from, max: ranges.yaxis.to }
				})
			);

			// don't fire event on the overview to prevent eternal loop

			overview.setSelection(ranges, true);
		});

		$("#overview").bind("plotselected", function (event, ranges) {
			plot.setSelection(ranges);
		});
	}
})(jQuery);
/*
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
clock();

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