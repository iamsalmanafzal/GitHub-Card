'use strict';
// Plugins Required
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
// Default Watch Actions
gulp.task('default', function () {
       gulp.watch('./css/**/*.scss', ['sass']);
       // gulp.watch('./css/**/*.css', ['mincss']);
       gulp.watch('./js/main.js', ['minjs']);
});
// Compile SCSS into CSS
gulp.task('sass', function () {
       return gulp.src('./css/**/*.scss')
       .pipe(sourcemaps.init())
       .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
       .pipe(autoprefixer({
               browsers: ['last 2 versions'],
               cascade: false
       }))
       .pipe(sourcemaps.write('./'))
       .pipe(gulp.dest('./css'));
});
// Minify all JS Files into one file
gulp.task('minjs', function() {
       return gulp.src('./js/main.js')
       .pipe(sourcemaps.init())
       .pipe(concat('main.min.js'))
       .pipe(uglify())
       .pipe(sourcemaps.write('./'))
       .pipe(gulp.dest('./js'));
});