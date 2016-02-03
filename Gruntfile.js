module.exports = function(grunt){
	var javascriptsMainFile = 'public/javascripts/main.js',
		cssMainFile = 'public/styles/css/main.css';
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
					'public/styles/css/main.css' : 'src/sass/main.sass'
				}
			}
		},
		cssmin:{
			target:{
				files:{
					'public/styles/css/main.css': cssMainFile
				}
			}
		},
		concat:{
			scripts:{
				src: [
					'bower_components/jquery/dist/jquery.min.js',
					'bower_components/bootstrap/dist/js/bootstrap.min.js',
					'bower_components/jquery-bar-rating/dist/jquery.barrating.min.js',
					'bower_components/socket.io-client/socket.io.js'
				],
				dest: 'public/javascripts/vendor.js'
			},
			styles:{
				src: [
					'bower_components/bootstrap/dist/css/bootstrap.min.css',
					'bower_components/font-awesome/css/font-awesome.min.css',
					'bower_components/bootstrap-social/bootstrap-social.css',
					'bower_components/jquery-bar-rating/dist/themes/fontawesome-stars.css'
					],
				dest: 'public/styles/css/libs.css'
			}
		},
		copy:{
			bootstrapFonts:{
				src: 'bower_components/bootstrap/dist/fonts/*',
				dest: 'public/styles/fonts/',
				expand: true,
				flatten: true
			},
			fontAwesomeFonts:{
				src: 'bower_components/font-awesome/fonts/*',
				dest: 'public/styles/fonts/',
				expand: true,
				flatten: true
			},
			bootstrap:{
				src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
				dest: 'public/styles/css/',
				expand: true,
				flatten: true
			},
			fontAwesome:{
				src:'bower_components/font-awesome/css/font-awesome.min.css',
				dest: 'public/styles/css/',
				expand: true,
				flatten: true
			}

		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('js', ['browserify', 'uglify']);
	grunt.registerTask('css', ['sass', 'cssmin']);
	grunt.registerTask('libs', [
								'concat:scripts',
								'concat:styles',
						 		'copy:bootstrapFonts',
						 		'copy:fontAwesomeFonts'
					 		  ]);
	grunt.registerTask('default', ['js','css','libs']);
}
