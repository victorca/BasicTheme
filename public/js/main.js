(function ($) {
	/*
	 Uniform fields.
	 TODO: Add a filter option to fields to be excluded.
	 */
	if ($.fn.uniform) {
		$('form.uniform input,form.uniform select, form.uniform .textarea')
			.add('.uniform.input,.uniform.select, .uniform.textarea')
			.uniform();
	}

	/*
	 Knobs.
	 */
	if ($.fn.knob) {
		$('.knob').knob({
			draw: function () {

				// "tron" case
				if (this.$.data('skin') == 'tron') {

					var a = this.angle(this.cv)  // Angle
						, sa = this.startAngle          // Previous start angle
						, sat = this.startAngle         // Start angle
						, ea                            // Previous end angle
						, eat = sat + a                 // End angle
						, r = 1;

					this.g.lineWidth = this.lineWidth;

					this.o.cursor
						&& (sat = eat - 0.3)
					&& (eat = eat + 0.3);

					if (this.o.displayPrevious) {
						ea = this.startAngle + this.angle(this.v);
						this.o.cursor
							&& (sa = ea - 0.3)
						&& (ea = ea + 0.3);
						this.g.beginPath();
						this.g.strokeStyle = this.pColor;
						this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
						this.g.stroke();
					}

					this.g.beginPath();
					this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
					this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
					this.g.stroke();

					this.g.lineWidth = 2;
					this.g.beginPath();
					this.g.strokeStyle = this.o.fgColor;
					this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
					this.g.stroke();

					return false;
				}
			}
		});

		// Example of infinite knob, iPod click wheel
		var v,
			up = 0,
			down = 0,
			i = 0,
			$idir = $('div.idir'),
			$ival = $('div.ival'),
			incr = function () {
				i++;
				$idir.show().html("+").fadeOut();
				$ival.html(i);
			},
			decr = function () {
				i--;
				$idir.show().html("-").fadeOut();
				$ival.html(i);
			};

		$('.knob-infinite').knob({
			min: 0, max: 20, stopper: false, change: function () {
				if (v > this.cv) {
					if (up) {
						decr();
						up = 0;
					} else {
						up = 1;
						down = 0;
					}
				} else {
					if (v < this.cv) {
						if (down) {
							incr();
							down = 0;
						} else {
							down = 1;
							up = 0;
						}
					}
				}
				v = this.cv;
			}
		});
	}

	/*
	 * Colorpickers.
	 */
	if ($.fn.colorpicker) {
		$('.colorpicker').colorpicker();
	}

	/*
	 * Datepickers.
	 */
	if ($.fn.datepicker) {
		$('.datepicker').datepicker();
	}

	/*
	 * Timepickers.
	 */
	if ($.fn.timepicker) {
		$('.timepicker').timepicker();
	}

	/*
	 * Datetimepickers.
	 */
	if ($.fn.datetimepicker) {
		$('.datetimepicker')
			.not('.datetimepicker-ampm')
			.not('.datetimepicker-onlydatepicker')
			.not('.datetimepicker-onlytimepicker')
			.datetimepicker();

		$('.datetimepicker-ampm').datetimepicker({
			pick12HourFormat: true
		});

		$('.datetimepicker-onlydatepicker').datetimepicker({
			pickTime: false
		});

		$('.datetimepicker-onlytimepicker').datetimepicker({
			pickDate: false
		});
	}

	/*
	 * Star Ratings.
	 */
	if ($.fn.raty) {
		$('.star-rating').raty({
			path    : '/js/vendor/raty/img',
			number  : function () {
				return $(this).attr('data-number') || 5;
			},
			score   : function () {
				return $(this).attr('data-score') || 0;
			},
			readOnly: function () {
				return $(this).attr('data-readonly') || false;
			},
			half    : function () {
				return $(this).attr('data-half') || false;
			},
			cancel  : function () {
				return $(this).attr('data-cancel') || false;
			}
		});
	}

	/**
	 * Boxes utilities.
	 * Minimize & Maximize Box button.
	 */
	$('.box .control-drop').on('click', function () {
		var box$ = $(this).closest('.box'),
			box_content$ = box$.find('.box-content');

		if ($(this).hasClass('icon-chevron-up')) {
			$(this).removeClass('icon-chevron-up').addClass('icon-chevron-down');

			box$.removeClass('box-unfolded').addClass('box-folded');
			box_content$.slideUp(200);
		}
		else {
			$(this).removeClass('icon-chevron-down').addClass('icon-chevron-up');

			box$.removeClass('box-folded').addClass('box-unfolded');
			box_content$.slideDown(200);
		}
	});

	/**
	 * Remove Box button.
	 */
	$('.box .control-remove').on('click', function () {
		$(this).closest('.box').remove();
	});

	/**
	 * Tooltips.
	 */
	if ($.fn.tooltip) {
		$('.tip').tooltip();
	}

	/**
	 * Chosen.
	 */
	if ($.fn.chosen) {
		$('.chzn-select').not('.chzn-select-deselect').chosen();

		$('.chzn-select-deselect').chosen({
			allow_single_deselect: true
		});
	}
})(jQuery);
