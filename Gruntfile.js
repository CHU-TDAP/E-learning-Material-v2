module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            livereload: {
                files: ['*.html', '**/*.css'],
                tasks: ['copy', 'ssi'],
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
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', []);
    grunt.registerTask('default', ['build','connect', 'watch']);
};
