module.exports 	= function (app) {
	app.get('/', require('./basic/index.js').index);
	app.get('/basic', require('./basic/index.js').index);

	app.get('/basic/typography', require('./basic/typography.js').index);
	app.get('/basic/tables/data', require('./basic/tables.js').data);
};