module.exports 	= function (app) {
	app.get('/', require('./basic/index.js').index);
	app.get('/basic', require('./basic/index.js').index);

	app.get('/basic/typography', require('./basic/typography.js').index);

	app.get('/basic/tables/simple', require('./basic/tables.js').simple);
	app.get('/basic/tables/data', require('./basic/tables.js').data);

	app.get('/basic/navigation/breadcrumbs', require('./basic/navigation.js').breadcrumbs);
	app.get('/basic/navigation/tabs', require('./basic/navigation.js').tabs);
	app.get('/basic/navigation/pills', require('./basic/navigation.js').pills);
};