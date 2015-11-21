module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		nodemon: {
			dev: {
				script: "libs/server.js"
			}
		},
		watch: {
			files: ['**/*'],
			task: ['nodemon']
		},

		concurrent: {
			watchers: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('serve', ["concurrent:watchers"]);
};