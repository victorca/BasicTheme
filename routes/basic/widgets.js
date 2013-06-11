module.exports = {
	boxes        : function (req, res) {
		res.render('basic/widgets/boxes', {
			title: 'Express',
			page : 'basic/widgets/boxes'
		});
	},
	scrollbar    : function (req, res) {
		res.render('basic/widgets/scrollbar', {
			title: 'Express',
			page : 'basic/widgets/scrollbar'
		});
	},
	progressbar  : function (req, res) {
		res.render('basic/widgets/progressbar', {
			title: 'Express',
			page : 'basic/widgets/progressbar'
		});
	},
	conversations: function (req, res) {
		res.render('basic/widgets/conversations', {
			title: 'Express',
			page : 'basic/widgets/conversations'
		});
	}
};