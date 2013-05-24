module.exports = {
	content: function (req, res) {
		res.render('basic/grid/content', {
			title: 'Express',
			page : 'basic/grid/content'
		});
	}
};