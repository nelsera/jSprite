'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        clean: ['dist'],
        copy: {
            dist: {
                files: [{
                    expand: true,
                    src: ['source/jquery.jSprite.js'],
                    flatten: true,
                    dest: 'dist',
                    filter: 'isFile'
                }]
            }
        }
    });

    grunt.registerTask('dist', [
        'clean',
        'copy:dist'
    ]);

    grunt.registerTask('default', ['dist']);
};
