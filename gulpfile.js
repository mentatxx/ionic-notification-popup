var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

gulp.task('js', function() {
  return gulp.src('./js/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('ionic-notification-popup.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../js'}))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('scss', function(){
    return gulp.src('./scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(concat('ionic-notification-popup.min.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../scss'}))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('default', ['js', 'scss']);
