module.exports = {
	content: function (req, res) {
		res.render('basic/grid/content', {
			title: 'Express',
			page : 'basic/grid/content'
		});
	},
	form: function (req, res) {
		res.render('basic/grid/form', {
			title: 'Express',
			page : 'basic/grid/form'
		});
	}
};