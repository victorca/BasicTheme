/**
 * TODO: To generate jade file for fugue icon set.
 */
var fs = require('fs');

fs.readdir('/home/diosney/PhpstormProjects/Basic Theme/public/images/icons/fugue-icons/icons', function (error, files) {
	if (!error) {
		fs.open('icons.jade', "a", 0744, function (err, fd) {
			if (err) throw err;

			var string = '';
			files.sort().forEach(function (element, index, array) {
				string = '									li\n';
				string += '										img(src="/images/icons/fugue-icons/icons/' + element + '")\n';
				string += '										| ' + element.split('.')[0] + '\n';

				fs.write(fd, string, null, 'utf8', function (err, written) {
					if (err) throw err;
				});
			});
		});


	}
	else {
		console.log(error);
	}
});