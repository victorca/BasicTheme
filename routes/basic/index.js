exports.index = function (req, res) {
	res.render('basic/index', {
		title: 'Express',
		page: 'basic/index'
	});
};