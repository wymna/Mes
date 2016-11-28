var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});
gulp.task('js', function() {
  return gulp
    .src('./www/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.build));
});

gulp.task('templatecache',  function() {
 // log('Creating AngularJS $templateCache');

  return gulp
    .src(config.htmltemplates)
    .pipe($.minifyHtml({empty: true}))
    .pipe($.angularTemplatecache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.build));
});

gulp.task('jslib', function() {
  return gulp
    .src(config.js)
    .pipe(concat('allf.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.build));
});
