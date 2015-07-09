var gulp = require('gulp');
var mocha = require('gulp-mocha');
var browserify = require('gulp-browserify');

gulp.task('default', function(){

});


gulp.task('run:mocha', function(){
    return gulp.src('./test/**/*.js').pipe(mocha({
        reporter:'spec'
    }))
});