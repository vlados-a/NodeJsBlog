module.exports = function(grunt){
	var javascriptsMainFile = 'public/javascripts/main.js';
	grunt.initConfig({
		uglify: {
			build:{
				src: javascriptsMainFile,
				dest: javascriptsMainFile
			}
		},
		browserify:{
			dist:{
				files:{
					'public/javascripts/main.js': 'src/js/**/*.js'
				}
			}
		},

		sass:{
			dist:{
				files:{
					'public/css/main.css' : 'src/sass/main.sass'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('js', ['browserify', 'uglify']);
	grunt.registerTask('css', ['sass']);
}