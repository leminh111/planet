var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('dist', function() {
  var b = browserify({
    entries: './src/scripts/index.js',
    debug: true,
    transform: [
      ['babelify', { presets: 'es2015' }]
    ]
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./www/assets/js/'))
});

gulp.task('front-controller', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./www/'));
});

gulp.task('watch', ['dist', 'front-controller'], function() {
  gulp.watch('./src/scripts/**', ['dist']);
  gulp.watch('./src/index.html', ['front-controller']);
})
