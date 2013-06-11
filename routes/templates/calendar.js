module.exports = {
	full: function (req, res) {
		res.render('templates/calendar/full', {
			title: 'Express',
			page : 'templates/calendar/full'
		});
	},
	boxed  : function (req, res) {
		res.render('templates/calendar/boxed', {
			title: 'Express',
			page : 'templates/calendar/boxed'
		});
	}
};