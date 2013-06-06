exports.index = function (req, res) {
	res.render('forms/advanced', {
		title: 'Express',
		page: 'forms/advanced'
	});
};