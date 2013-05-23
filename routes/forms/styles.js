module.exports = {
	horizontal: function (req, res) {
		res.render('forms/styles/horizontal', {
			title: 'Express',
			page : 'forms/styles/horizontal'
		});
	},
	vertical  : function (req, res) {
		res.render('forms/styles/vertical', {
			title: 'Express',
			page : 'forms/styles/vertical'
		});
	},
	inline  : function (req, res) {
		res.render('forms/styles/inline', {
			title: 'Express',
			page : 'forms/styles/inline'
		});
	}
};