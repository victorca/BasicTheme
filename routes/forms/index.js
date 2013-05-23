exports.index = function (req, res) {
	res.render('forms/index', {
		title: 'Express',
		page: 'forms/index'
	});
};