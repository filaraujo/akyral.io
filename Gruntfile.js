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
            options: {
                assets: '<%= config.dist %>/assets'
            },
            pages: {
                options: {
                    collections: [{
                        name: 'components'
                    }],
                    flatten: true,
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

        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            files: {
                expand: true,
                flatten: true,
                src: '<%= config.dist %>/assets/styles/*.css',
                dest: '<%= config.dist %>/assets/styles/'
            },
        },

        // Before generating any new files,
        // remove any previously-created files.
        clean: ['<%= config.dist %>/**'],

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/',
                    src: ['assets/**/*', '!assets/styles/**/*.scss'],
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

        font: {
            dist: {
                src: '<%= config.src %>/assets/svg/*.svg',
                destCss: '<%= config.src %>/assets/styles/_icons.scss',
                destFonts: '<%= config.src %>/assets/fonts/icons.{svg,woff,eot,ttf}',
                cssFormat: 'scss',
                fontFamily: 'icon'
            },
        },

        'gh-pages': {
            options: {
                base: 'dist',
                message: 'Auto-generated commit'
            },
            src: ['**']
        },

        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/',
                    src: ['*.html','!assets/**/*.html'],
                    dest: '<%= config.dist %>/',
                    ext: '.html'
                }]
            }
        },

        sass: { // task
            options: {
                outputStyle: 'compressed'
            },
            dist: { // target
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
                tasks: ['assemble', 'htmlmin']
            },
            assets: {
                files: ['<%= config.src %>/assets/**'],
                tasks: ['sass', 'autoprefixer', 'copy', ]
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
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('server', [
        'clean',
        'assemble',
        'sass',
        'autoprefixer',
        'copy',
        'htmlmin',
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
