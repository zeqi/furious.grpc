/**
 * Created by zhuxijun on 16-4-27.
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var generator = require('../../codegen/task/generator');

var option = {
    build: ['build/*'],
    definition: ['../../codegen/definition/*.js']
}

var template = {
    mongoose_schema: '../../codegen/template/mongoose-schema.mustache',
    mongoose_dao: '../../codegen/template/mongoose-dao.mustache',
    business: '../../codegen/template/business.mustache',
    api: '../../codegen/template/api.mustache',
    inter: '../../codegen/template/interface.mustache'
}

gulp.task('clear', function () {
    return gulp.src(option.build)
        .pipe(clean());
});

gulp.task('model', function () {
    return gulp.src(option.definition)
        .pipe(generator({template: template.mongoose_schema}))
        .pipe(gulp.dest('persistence/models/'));
});

gulp.task('dao', function () {
    return gulp.src(option.definition)
        .pipe(generator({template: template.mongoose_dao}))
        .pipe(gulp.dest('persistence/dao/'));
});

gulp.task('business', function () {
    return gulp.src(option.definition)
        .pipe(generator({template: template.business}))
        .pipe(gulp.dest('business/gen/'));
});

gulp.task('api', function () {
    return gulp.src(option.definition)
        .pipe(generator({template: template.api}))
        .pipe(gulp.dest('api/gen/'));
});

gulp.task('inter', function () {
    return gulp.src(option.definition)
        .pipe(generator({template: template.inter}))
        .pipe(gulp.dest('interface/gen/'));
});

gulp.task('default', ['clear', 'model', 'dao', 'business', 'api', 'inter']);