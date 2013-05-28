module.exports = {
	icons: function (req, res) {
		res.render('basic/images/icons', {
			title: 'Express',
			page : 'basic/images/icons'
		});
	}
};