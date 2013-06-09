module.exports = {
	conversations: function (req, res) {
		res.render('basic/widgets/conversations', {
			title: 'Express',
			page : 'basic/widgets/conversations'
		});
	}
};