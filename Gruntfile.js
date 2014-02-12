'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'dist'
                    ]
                }]
            }
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

    grunt.registerTask('dist', function () {
        'clean:dist'
    });
};