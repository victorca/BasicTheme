module.exports 	= {
	simple       : function (req, res) {
		res.render('basic/tables/simple', {
			title: 'Express',
			page: 'basic/tables/simple'
		});
	},
	data       : function (req, res) {
		res.render('basic/tables/data', {
			title: 'Express',
			page: 'basic/tables/data'
		});
	}
};