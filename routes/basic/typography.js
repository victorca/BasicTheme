exports.index = function (req, res) {
	res.render('basic/typography', {
		title: 'Express',
		page: 'basic/typography'
	});
};