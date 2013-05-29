exports.index = function (req, res) {
	res.render('templates/index', {
		title: 'Express',
		page: 'templates/index'
	});
};