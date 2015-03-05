module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
          options: {
            includePaths: ['vendor/foundation/scss']
          },
          dist: {
            options: {
              outputStyle: 'compressed'
            },
            files: {
              'css/app.css': 'scss/app.scss'
            }
          }
        },
        watch: {
            livereload: {
                files: ['**/*.html', 'js/*.js', 'scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    livereload: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', ['sass']);
    grunt.registerTask('default', ['build','connect', 'watch']);
};
