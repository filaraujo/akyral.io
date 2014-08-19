var gulp = require('gulp');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var exec = require('child_process').exec;
var deploy = require("gulp-gh-pages");



var paths = {
    distDir: './dist',
    src: './src/**/*',
    templates: './templates/**/*'
};

gulp.task('webserver', function() {
  gulp.src(paths.distDir)
    .pipe(webserver({
      livereload: true,
      directoryListing: {
        enable:true,
        path: paths.distDir
      },
      open: true
    }));
});


gulp.task('watch', function() {
  gulp.watch(paths.src, ['build']);
  gulp.watch(paths.templates, ['build']);
});


gulp.task('build', function(cb){
    exec('node index.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
     });
});

gulp.task('deploy', function () {
    gulp.src("./dist/**/*")
        .pipe(deploy())
        .pipe(gulp.dest('.tmp'));
});

gulp.task('server', ['webserver', 'watch']);
