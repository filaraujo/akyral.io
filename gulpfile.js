var gulp = require('gulp');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var exec = require('child_process').exec;
var deploy = require('gulp-gh-pages');


var paths = {
  distDir: './dist',
  src: './src/**/*',
  components: [
    './src/assets/components/**/*',
    '!./src/assets/components/{akyral-app,akyral-app/**}',
    '!./src/assets/components/{akyral-docs,akyral-docs/**}'
  ],
  templates: './templates/**/*'
};

gulp.task('webserver', function() {
  gulp.src(paths.distDir)
    .pipe(webserver({
      livereload: false,
      directoryListing: {
        enable: true,
        path: paths.distDir
      },
      open: true
    }));
});

gulp.task('clean', function() {
  return gulp.src(paths.components, {
    read: false
  })
    .pipe(clean({
      force: true
    }));
});


gulp.task('watch', function() {
  gulp.watch(paths.src, ['build']);
  gulp.watch(paths.templates, ['build']);
});


gulp.task('build', function(cb) {
  return exec('node index.js', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('deploy', function() {
  gulp.src('dist/**/*.*')
    .pipe(deploy({
      cacheDir: '.cache' // needed for some odd reason
    }))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('server', ['webserver', 'watch']);
