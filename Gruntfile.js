'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        clean: ['dist'],
        copy: {
            main: {
                expand: true,
                src: ['source/jquery.jSprite.js'],
                flatten: true,
                dest: 'dist',
                filter: 'isFile'
            }
        },
        uglify: {
            main: {
                files: {
                    'dist/jquery.jSprite.min.js': ['dist/jquery.jSprite.js']
                }
            }
        }
    });

    grunt.registerTask('dist', [
        'clean',
        'copy',
        'uglify'
    ]);

    grunt.registerTask('default', ['dist']);
};
