module.exports 	= {
	data       : function (req, res) {
		res.render('basic/tables/data', {
			title: 'Express',
			page: 'basic/tables/data'
		});
	}
};