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
                    dot: true,
                    cwd: 'source/',
                    dest: 'dist/',
                    src: [
                        'source/jquery.jSprite.js'
                    ]
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
