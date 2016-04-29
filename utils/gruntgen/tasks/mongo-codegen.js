/**
 * Mongo DB artifacts(3 lays) generator
 *
 * @author lizh
 *
 */

var fs = require('fs');
var Mustache = require('mustache');
var path = require('path');
var beautify = require('js-beautify').js_beautify;

var templatesDir = path.resolve(process.cwd(), './persistence/codegen/templates/');

// mongoose model template
var db_model_template = fs.readFileSync(path.resolve(templatesDir, 'db-model.mustache'), 'utf-8');

// dao class template
var dao_class_template = fs.readFileSync(path.resolve(templatesDir, 'dao-class.mustache'), 'utf-8');
var dao_create_method_template = fs.readFileSync(path.resolve(templatesDir, 'dao-create-method.mustache'), 'utf-8');
var dao_del_methods_template = fs.readFileSync(path.resolve(templatesDir, 'dao-delByKey-method.mustache'), 'utf-8');
var dao_update_method_template = fs.readFileSync(path.resolve(templatesDir, 'dao-entireUpdate-method.mustache'), 'utf-8');
var dao_retrieve_methods_template = fs.readFileSync(path.resolve(templatesDir, 'dao-retrieveByKey-method.mustache'), 'utf-8');
var dao_retrieve_inCache_template = fs.readFileSync(path.resolve(templatesDir, 'dao-retrieveInCache-method.mustache'), 'utf-8');
var dao_retrieve_by_condition_method_template = fs.readFileSync(path.resolve(templatesDir, 'dao-retrieveByCondition-method.mustache'), 'utf-8');
var dao_count_method_template = fs.readFileSync(path.resolve(templatesDir, 'dao-count-method.mustache'), 'utf-8');
var dao_updateByCondition_method_template = fs.readFileSync(path.resolve(templatesDir, 'dao-updateByCondition-method.mustache'), 'utf-8');

// router class template
var router_class_template = fs.readFileSync(path.resolve(templatesDir, 'router-class.mustache'), 'utf-8');
var router_create_method_template = fs.readFileSync(path.resolve(templatesDir, 'router-create-method.mustache'), 'utf-8');
var router_delByKey_method_template = fs.readFileSync(path.resolve(templatesDir, 'router-delByKey-method.mustache'), 'utf-8');
var router_getByCondition_method_template = fs.readFileSync(path.resolve(templatesDir, 'router-getByCondition-method.mustache'), 'utf-8');
var router_getByKey_method_template = fs.readFileSync(path.resolve(templatesDir, 'router-getByKey-method.mustache'), 'utf-8');
var router_updateByKey_method_template = fs.readFileSync(path.resolve(templatesDir, 'router-updateByKey-method.mustache'), 'utf-8');

// router-register class template
var router_register_template = fs.readFileSync(path.resolve(templatesDir, 'router-register.mustache'), 'utf-8');


var extSrcFileName = '.js';

var Codegen = function (info, opts) {
    this.logger = opts.logger;
    this.modelDir = path.resolve(process.cwd(), opts.modelDir);
    this.daoDir = path.resolve(process.cwd(), opts.daoDir);
    this.routeDir = path.resolve(process.cwd(), opts.routeDir);
    this.registerDir = path.resolve(process.cwd(), opts.registerDir);
    this.overwrite = opts.overwrite;
    this.info = info;
};

Codegen.prototype.genModelSrc = function () {
    var srcFile = path.resolve(this.modelDir, this.info.moduleName + extSrcFileName);
    if (fs.existsSync(srcFile) && !this.overwrite) {
        this.logger.ok('Source code file - ' + srcFile + ' already exists, skip the genenration');
        return;
    }

    var source = Mustache.render(db_model_template, this.info);
    source = beautify(source, {indent_size: 4, max_preserve_newlines: 2});

    fs.writeFileSync(srcFile, source, {encoding: 'utf8'});
    this.logger.ok('Generate model code "' + srcFile + '"');
};

Codegen.prototype.genDaoSrc = function () {
    var srcFile = path.resolve(this.daoDir, this.info.moduleName + extSrcFileName);
    if (fs.existsSync(srcFile) && !this.overwrite) {
        this.logger.ok('Source code file - ' + srcFile + ' already exists, skip the genenration');
        return;
    }

    var source = Mustache.render(dao_class_template, this.info, {
        'dao-create-method': dao_create_method_template,
        'dao-delByKey-method': dao_del_methods_template,
        'dao-entireUpdate-method': dao_update_method_template,
        'dao-updateByCondition-method': dao_updateByCondition_method_template,
        'dao-retrieveByKey-method': dao_retrieve_methods_template,
        'dao-retrieveInCache-method': dao_retrieve_inCache_template,
        'dao-retrieveByCondition-method': dao_retrieve_by_condition_method_template,
        'dao-count-method': dao_count_method_template
    });
    source = beautify(source, {indent_size: 4, max_preserve_newlines: 2});

    fs.writeFileSync(srcFile, source, {encoding: 'utf8'});
    this.logger.ok('Generate dao code "' + srcFile + '"');
};

Codegen.prototype.genRouteSrc = function () {
    var srcFile = path.resolve(this.routeDir, this.info.moduleName + extSrcFileName);
    if (fs.existsSync(srcFile) && !this.overwrite) {
        this.logger.ok('Source code file - ' + srcFile + ' already exists, skip the genenration');
        return;
    }

    var source = Mustache.render(router_class_template, this.info, {
        'router-create-method': router_create_method_template,
        'router-delByKey-method': router_delByKey_method_template,
        'router-getByCondition-method': router_getByCondition_method_template,
        'router-getByKey-method': router_getByKey_method_template,
        'router-updateByKey-method': router_updateByKey_method_template
    });
    source = beautify(source, {indent_size: 4, max_preserve_newlines: 2});

    fs.writeFileSync(srcFile, source, {encoding: 'utf8'});
    this.logger.ok('Generate route code "' + srcFile + '"');
};

Codegen.prototype.genRegisterSrc = function () {
    var srcFile = path.resolve(this.registerDir, this.info.moduleName + extSrcFileName);
    if (fs.existsSync(srcFile) && !this.overwrite) {
        this.logger.ok('Source code file - ' + srcFile + ' already exists, skip the genenration');
        return;
    }

    if (!this.info.isRegister) {
        return false;
    }

    var source = Mustache.render(router_register_template, this.info);
    source = beautify(source, {indent_size: 4, max_preserve_newlines: 2});

    fs.writeFileSync(srcFile, source, {encoding: 'utf8'});
    this.logger.ok('Generate route code "' + srcFile + '"');
};

Codegen.prototype.genTestSrc = function () {

};

Codegen.prototype.genSampleDataSrc = function () {

};


/**
 * MongodbCodeGen Grunt task registration
 *
 */
module.exports = function (grunt) {

    grunt.registerMultiTask('mongodbCodeGen',
        'Parse the persistent definition, generate Mongoose model, DAO and router classes',
        function () {
            var done = this.async();

            var options = this.options();
            options.logger = grunt.log;

            var defs = options.definitions;
            if (!defs || defs.length === 0) {
                grunt.log.ok('No db definitions supplied, nothing need to be generated');
                done();
                return;
            }

            defs.forEach(function (def) {
                try {
                    var defPath = path.resolve(process.cwd(), def);
                    grunt.log.ok('Loading definition file from ' + defPath);
                    var def = require(defPath);
                    var codegen = new Codegen(def.info, options);
                    codegen.genModelSrc();
                    codegen.genDaoSrc();
                    codegen.genRouteSrc();
                    codegen.genRegisterSrc();
                } catch (error) {
                    grunt.log.error('Failed to generate source for definition "' + def + '" due to: ', error);
                    done(error);
                }
            });

            done();
        });
};


