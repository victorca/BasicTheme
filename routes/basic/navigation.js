module.exports = {
	breadcrumbs: function (req, res) {
		res.render('basic/navigation/breadcrumbs', {
			title: 'Express',
			page : 'basic/navigation/breadcrumbs'
		});
	},
	tabs: function (req, res) {
		res.render('basic/navigation/tabs', {
			title: 'Express',
			page : 'basic/navigation/tabs'
		});
	},
	pills: function (req, res) {
		res.render('basic/navigation/pills', {
			title: 'Express',
			page : 'basic/navigation/pills'
		});
	}
};