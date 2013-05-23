exports.index = function (req, res) {
	res.render('forms/basic', {
		title: 'Express',
		page: 'forms/basic'
	});
};