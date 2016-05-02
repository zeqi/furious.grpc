/**
 * Created by zhuxijun on 16-4-27.
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var model = require('./task/model');

var option = {
    build: ['build/*'],
    definition: ['definition/*.js']
}

var template = {
    mongoose_schema:'mongoose-schema.mustache'
}

gulp.task('clear', function () {
    return gulp.src(option.build)
        .pipe(clean());
});

gulp.task('model', function () {
    return gulp.src(option.definition)
        .pipe(model({template:'template/mongoose-schema.mustache'}))
        .pipe(gulp.dest('build'));
})

gulp.task('default', ['clear', 'model']);