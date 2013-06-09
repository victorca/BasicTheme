module.exports = {
	progressbar: function (req, res) {
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