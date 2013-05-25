(function ($) {
	/*
	 Uniform fields.
	 TODO: Add a filter option to fields to be excluded.
	 */
	$('form.uniform input,form.uniform select, form.uniform .textarea')
		.add('.uniform.input,.uniform.select, .uniform.textarea')
		.uniform();
})(jQuery);
