/*
 * Generated on 2014-07-25
 * generator-assemble v0.4.13
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({

        config: {
            src: 'src',
            dist: 'dist'
        },

        assemble: {
            pages: {
                options: {
                    collections: [{
                        name: 'components'
                    }],
                    flatten: true,
                    assets: '<%= config.dist %>/assets',
                    layout: '<%= config.src %>/templates/layouts/default.hbs',
                    data: '<%= config.src %>/data/*.{json,yml}',
                    partials: '<%= config.src %>/templates/partials/*.hbs',
                    plugins: ['assemble-contrib-permalinks', 'assemble-contrib-sitemap'],
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/templates/pages/',
                    src: ['**/*.hbs'],
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Before generating any new files,
        // remove any previously-created files.
        clean: ['<%= config.dist %>/**'],

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/',
                    src: ['assets/**/*','!assets/styles/**/*.scss'],
                    dest: '<%= config.dist %>'
                }]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= config.dist %>'
                    ]
                }
            }
        },

        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        },

        sass: {                                 // task
            dist: {                             // target
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/',
                    src: ['assets/styles/**/*'],
                    dest: '<%= config.dist %>',
                    ext: '.css'
                }]
            }
        },

        watch: {
            assemble: {
            files: ['<%= config.src %>/{content,data,templates}/**/{,*/}*.{md,hbs,yml}'],
                tasks: ['assemble']
            },
            assets: {
                files: ['<%= config.src %>/assets/**'],
                tasks: ['sass','copy']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.dist %>/{,*/}*.html',
                    '<%= config.dist %>/assets/{,*/}*.css',
                    '<%= config.dist %>/assets/{,*/}*.js',
                    '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        }

    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('server', [
        'clean',
        'assemble',
        'sass',
        'copy',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'assemble',
        'copy'
    ]);



    grunt.registerTask('publish', [
        'gh-pages'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);



};
