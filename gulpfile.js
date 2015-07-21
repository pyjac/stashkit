var gulp = require('gulp');
var mocha = require('gulp-mocha');
var browserify = require('gulp-browserify');

gulp.task('default', function(){});

/**
 *
 * this task runs the mocha tool. Should be normally called by tranvia via npm test command.
 *
 * */

gulp.task('run:mocha', function(){
    return gulp.src('./test/**/*.js').pipe(mocha({
        reporter:'spec'
    }))
});

/**
 *
 * This task builds the angular app that drive the web console
 *
 * */

gulp.task('build:angular-app', function(){
    return gulp.src("./content/app/index.js")
        .pipe(browserify({
            insertGlobals:true
        }))
        .pipe(gulp.dest('./content/public/build'));
});