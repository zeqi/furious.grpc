/**
 * Created by zhuxijun on 16-4-27.
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var jsdoc = require('gulp-jsdoc3');
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
    inter: '../../codegen/template/interface.mustache',
    proto: '../../codegen/template/proto.mustache'
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

gulp.task('proto', function () {
    return gulp.src(option.definition)
        .pipe(generator({template: template.proto}))
        .pipe(rename({
            extname: '.proto'
        }))
        .pipe(gulp.dest('../../protos/gen/'));
});

gulp.task('jsdoc', function () {
    return gulp.src(['interface/*', 'api/*', 'business/*', 'persistence/*'], {read: false})
        .pipe(jsdoc({
            "tags": {
                "allowUnknownTags": true
            },
            "opts": {
                "destination": "./docs/gen"
            },
            "plugins": [
                "plugins/markdown"
            ],
            "templates": {
                "cleverLinks": true,
                "monospaceLinks": false,
                "default": {
                    "outputSourceFiles": true
                },
                "path": "ink-docstrap",
                "theme": "cerulean",
                "navType": "vertical",
                "linenums": true,
                "dateFormat": "MMMM Do YYYY, h:mm:ss a"
            }
        }));
    /*.pipe(jsdoc.parser({name: 'docs', version: '0.0.1'}, 'zeqi'))
     .pipe(gulp.dest('jsdoc'));*/
});

gulp.task('default', ['clear', 'model', 'dao', 'business', 'api', 'inter', 'proto', 'jsdoc']);