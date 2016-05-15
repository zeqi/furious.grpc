/**
 * Created by zhuxijun on 16-4-27.
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var generator = require('../../codegen/task/generator');

var option = {
    build: ['build/*'],
    definition: ['../../codegen/definition/*.js']
}

var template = {
    client: '../../codegen/template/client.mustache'
}

gulp.task('clear', function () {
    return gulp.src(option.build)
        .pipe(clean());
});

gulp.task('service', function () {
    return gulp.src(option.definition)
        .pipe(generator({template: template.client}))
        .pipe(gulp.dest('service/'));
});

gulp.task('default', ['clear', 'service']);