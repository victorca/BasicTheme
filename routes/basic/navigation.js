module.exports = {
	breadcrumbs: function (req, res) {
		res.render('basic/navigation/breadcrumbs', {
			title: 'Express',
			page : 'basic/navigation/breadcrumbs'
		});
	}
};