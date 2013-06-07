module.exports = {
	charts: function (req, res) {
		res.render('basic/charts/charts', {
			title: 'Express',
			page : 'basic/charts/charts'
		});
	}
};