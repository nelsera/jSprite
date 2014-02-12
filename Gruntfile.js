'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            dist: 'dist'
        },

        copy: {
            files: [{
                expand: true,
                dot: true,
                cwd: 'source',
                dest: 'dist',
                src: [
                    'source/{,*/}*.*'
                ]
            }]
        }
    });

    grunt.registerTask('dist', [
        'clean'
    ]);
};